import type {
  PoseRule,
  PoseEvaluationResult,
  PoseEvaluatorContext,
  PoseIssue,
  RuleSeverity,
} from "../types/pose-rules";
import { evaluatePose } from "./PoseEvaluator";
import { AccuracyStabilizer } from "./AccuracyStabilizer";
import {
  isLandmarkValid,
  getLandmarkConfidence,
} from "./LandmarkUtils";
import { getAsanaCoachingProfile } from "../services/AsanaCoachingProfileService";

import { evaluateCompletionGate } from "./AsanaCompletionGate";

const ISSUE_PERSISTENCE_THRESHOLD = 10; // Frames an issue must persist to become primary

interface TrackingReadinessResult {
  ready: boolean;
  requiredLandmarks: number[];
  missingLandmarks: number[];
  confidence: number;
  missingRegions: string[];
}

const REGION_LANDMARKS: Record<string, number[]> = {
  head: [0],

  shoulders: [11, 12],
  elbows: [13, 14],
  wrists: [15, 16],

  torso: [11, 12, 23, 24],
  spine: [11, 12, 23, 24],
  hips: [23, 24],

  knees: [25, 26],
  ankles: [27, 28],

  feet: [27, 28, 31, 32],

  // Conceptual regions used by the coaching profile system
  arms: [11, 12, 13, 14, 15, 16],
  legs: [23, 24, 25, 26, 27, 28],
};

function evaluateTrackingReadiness(
  asanaId: string,
  rules: PoseRule[],
  landmarks: PoseEvaluatorContext["landmarks"],
): TrackingReadinessResult {
  if (!landmarks || landmarks.length < 33) {
    return {
      ready: false,
      requiredLandmarks: [],
      missingLandmarks: [],
      confidence: 0,
      missingRegions: ["body"],
    };
  }

  const profile = getAsanaCoachingProfile(asanaId);

  const requiredIndices = new Set<number>();

  /*
   * 1. Always require the head anchor.
   *
   * This prevents a cropped camera view from being considered
   * fully ready simply because torso/limb rules can be evaluated.
   */
  requiredIndices.add(0);

  /*
   * 2. Add stance-specific body requirements.
   *
   * Examples:
   * standing -> torso + legs + feet
   * seated   -> torso + legs + head
   * prone    -> torso + arms + head
   * etc.
   */
  for (const region of profile.requiredRegions ?? []) {
    const indices = REGION_LANDMARKS[String(region)];

    if (!indices) {
      continue;
    }

    for (const index of indices) {
      requiredIndices.add(index);
    }
  }

  /*
   * 3. Also require every landmark explicitly referenced
   *    by the active pose rules.
   *
   * This makes the gate pose-specific without hard-coding
   * any individual asana.
   */
  for (const rule of rules) {
    for (const point of rule.points ?? []) {
      if (
        Number.isInteger(point) &&
        point >= 0 &&
        point < 33
      ) {
        requiredIndices.add(point);
      }
    }
  }

  const requiredLandmarks = Array.from(requiredIndices).sort(
    (a, b) => a - b,
  );

  const missingLandmarks = requiredLandmarks.filter(
    (index) => !isLandmarkValid(landmarks[index]),
  );

  const missingRegions: string[] = [];

  for (const region of profile.requiredRegions ?? []) {
    const indices = REGION_LANDMARKS[String(region)];

    if (!indices) {
      continue;
    }

    const regionReady = indices.every((index) =>
      isLandmarkValid(landmarks[index]),
    );

    if (!regionReady) {
      missingRegions.push(String(region));
    }
  }

  /*
   * Calculate confidence only from landmarks that matter
   * for this asana.
   */
  const confidence =
    requiredLandmarks.length > 0
      ? requiredLandmarks.reduce(
          (sum, index) =>
            sum + getLandmarkConfidence(landmarks[index]),
          0,
        ) / requiredLandmarks.length
      : 0;

  /*
   * Strict gate:
   *
   * ALL required landmarks must be valid.
   *
   * This is what prevents a partial camera frame from producing
   * a believable accuracy percentage.
   */
  const ready =
    requiredLandmarks.length > 0 &&
    missingLandmarks.length === 0 &&
    missingRegions.length === 0 &&
    confidence >= 0.5;

  return {
    ready,
    requiredLandmarks,
    missingLandmarks,
    confidence,
    missingRegions,
  };
}

export class TemporalPoseEvaluator {
  private accuracyStabilizer = new AccuracyStabilizer();
  private previousSmoothedScore: number | null = null;
  private issuePersistence: Map<string, number> = new Map();
  private previouslyFailingRules: Set<string> = new Set();
  private holdFramesCount: number = 0;

  private readonly targetHoldFrames: number;

  constructor(targetHoldFrames: number = 150) {
    this.targetHoldFrames = targetHoldFrames;
  }

  public reset(): void {
    this.accuracyStabilizer.reset();
    this.previousSmoothedScore = null;
    this.issuePersistence.clear();
    this.previouslyFailingRules.clear();
    this.holdFramesCount = 0;
  }

  public evaluate(
    asanaId: string,
    rules: PoseRule[],
    context: PoseEvaluatorContext
  ): PoseEvaluationResult | null {
    const rawEvaluation = evaluatePose(asanaId, rules, context);
    
    const trackingReadiness = evaluateTrackingReadiness(
      asanaId,
      rules,
      context.landmarks,
    );

    const hasUsableTracking = trackingReadiness.ready;

    console.log("[TEMPORAL DEBUG]", {
      asanaId,

      landmarkCount: context.landmarks?.length,

      evaluatedRules: rawEvaluation.summary.evaluatedRules,

      overallStatus: rawEvaluation.overallStatus,

      rawScore: rawEvaluation.score,

      hasUsableTracking,

      requiredLandmarks:
        trackingReadiness.requiredLandmarks,

      missingLandmarks:
        trackingReadiness.missingLandmarks,

      missingRegions:
        trackingReadiness.missingRegions,

      trackingConfidence:
        trackingReadiness.confidence,
    });

    // Update the accuracy stabilizer
    const stabilized = this.accuracyStabilizer.update(
      hasUsableTracking ? rawEvaluation.score : null,
      hasUsableTracking
    );

    // If completely unavailable, return state indicating invalid tracking
    if (stabilized.stableAccuracy === null) {
      this.previousSmoothedScore = null;
      return {
        asanaId,
        score: 0,
        rawScore: 0,
        stableScore: undefined,
        displayedScore: undefined,
        isValid: false,
        primaryIssue: rawEvaluation.primaryIssue,
        secondaryIssues: rawEvaluation.issues,
        resolvedIssues: [],
        scoreTrend: "stable",
        stability: 0,
        holdProgress: 0,
        completionEligible: false,
        activeRules: rules.length,
        evaluatedAt: Date.now(),
        posture: rawEvaluation.posture,
        identity: rawEvaluation.identity,
        coverage: rawEvaluation.coverage,
        scoreCoverage: rawEvaluation.scoreCoverage,
      };
    }

    // 1. Score Trend based on stabilized score
    let scoreTrend: "improving" | "declining" | "stable" = "stable";
    if (this.previousSmoothedScore !== null) {
      const diff = stabilized.stableAccuracy - this.previousSmoothedScore;
      if (diff > 1) scoreTrend = "improving";
      else if (diff < -1) scoreTrend = "declining";
    }
    this.previousSmoothedScore = stabilized.stableAccuracy;

    // 2. Posture issues evaluation (immediate from raw rules, not delayed by accuracy smoothing)
    const currentIssueIds = new Set(rawEvaluation.issues.map((i) => i.ruleId));

    // Increment persistence for current issues
    for (const issue of rawEvaluation.issues) {
      const currentCount = this.issuePersistence.get(issue.ruleId) || 0;
      this.issuePersistence.set(issue.ruleId, currentCount + 1);
    }

    // Remove persistence for issues no longer present
    for (const id of this.issuePersistence.keys()) {
      if (!currentIssueIds.has(id)) {
        this.issuePersistence.delete(id);
      }
    }

    // 3. Identify Primary and Secondary Issues
    const severityWeight: Record<RuleSeverity, number> = {
      high: 3,
      medium: 2,
      low: 1,
      info: 0,
    };

    const sortedIssues = [...rawEvaluation.issues].sort((a, b) => {
      // 1. Severity
      if (severityWeight[a.severity] !== severityWeight[b.severity]) {
        return severityWeight[b.severity] - severityWeight[a.severity];
      }
      
      // 2. Persistence (longer is worse, up to threshold)
      const aPersistence = Math.min(this.issuePersistence.get(a.ruleId) || 0, ISSUE_PERSISTENCE_THRESHOLD);
      const bPersistence = Math.min(this.issuePersistence.get(b.ruleId) || 0, ISSUE_PERSISTENCE_THRESHOLD);
      
      if (aPersistence !== bPersistence) {
         return bPersistence - aPersistence;
      }

      return 0;
    });

    let primaryIssue: PoseIssue | null = null;
    let secondaryIssues: PoseIssue[] = [];

    if (sortedIssues.length > 0) {
      const topIssue = sortedIssues[0];
      const persistence = this.issuePersistence.get(topIssue.ruleId) || 0;
      const requiredCount = topIssue.severity === "high" ? 1 : ISSUE_PERSISTENCE_THRESHOLD;
      const isPromoted = persistence >= ISSUE_PERSISTENCE_THRESHOLD || topIssue.severity === "high";

      console.log(`[AI COACH][TRACE][6][TEMPORAL]`, {
        ruleId: topIssue.ruleId,
        severity: topIssue.severity,
        persistenceCount: persistence,
        requiredCount,
        promoted: isPromoted,
        reason: isPromoted
          ? (topIssue.severity === "high" ? "high_severity_immediate" : "persistence_threshold_met")
          : `persisting_${persistence}_of_${requiredCount}`,
      });

      if (isPromoted) {
         primaryIssue = topIssue;
         secondaryIssues = sortedIssues.slice(1);
      } else {
         secondaryIssues = sortedIssues;
      }
    }

    // 4. Track Resolved Issues
    const resolvedIssues: string[] = [];
    for (const id of this.previouslyFailingRules) {
      if (!currentIssueIds.has(id)) {
        resolvedIssues.push(id);
      }
    }
    this.previouslyFailingRules = currentIssueIds;

    // 5. Hold Progress & Completion Eligibility (Phase 4 single authoritative gate)
    const displayedScore = stabilized.displayedAccuracy ?? (stabilized.stableAccuracy !== null ? Math.round(stabilized.stableAccuracy) : undefined);
    
    const gateResult = evaluateCompletionGate({
      asanaId,
      evaluation: rawEvaluation,
      landmarks: hasUsableTracking ? context.landmarks : null,
      cameraReady: hasUsableTracking,
      completionAccuracyThreshold: 75,
    });

    const isEligibleNow = Boolean(
      hasUsableTracking &&
      gateResult.isEligible &&
      rawEvaluation.identity?.isMatch &&
      displayedScore !== undefined &&
      displayedScore >= 75
    );

    if (isEligibleNow) {
      this.holdFramesCount++;
    } else {
      this.holdFramesCount = 0; // True continuous hold: immediate reset to 0
    }

    const holdProgress = Math.min(100, (this.holdFramesCount / this.targetHoldFrames) * 100);
    const completionEligible = isEligibleNow && holdProgress >= 100;

    return {
      asanaId,
      score: displayedScore ?? 0, // Stable integer for backward compatibility
      rawScore: rawEvaluation.score,
      stableScore: stabilized.stableAccuracy ?? undefined,
      displayedScore: displayedScore ?? undefined,
      isValid: Boolean(hasUsableTracking && displayedScore !== undefined),
      primaryIssue,
      secondaryIssues,
      resolvedIssues,
      scoreTrend,
      stability: stabilized.isStable ? 100 : 70,
      holdProgress,
      completionEligible,
      activeRules: rules.length,
      evaluatedAt: Date.now(),
      summary: rawEvaluation.summary,
      confidence: rawEvaluation.confidence,
      coverage: rawEvaluation.coverage,
      scoreCoverage: rawEvaluation.scoreCoverage,
      posture: rawEvaluation.posture,
      identity: rawEvaluation.identity,
    };
  }
}
