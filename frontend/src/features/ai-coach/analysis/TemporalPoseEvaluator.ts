import type {
  PoseRule,
  PoseEvaluationResult,
  PoseEvaluatorContext,
  PoseIssue,
  RuleSeverity,
} from "../types/pose-rules";
import { evaluatePose } from "./PoseEvaluator";
import { AccuracyStabilizer } from "./AccuracyStabilizer";

const ISSUE_PERSISTENCE_THRESHOLD = 10; // Frames an issue must persist to become primary

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
    const hasOccludedLandmarks = rawEvaluation.score === 0 && rawEvaluation.issues.length === 0;

    // Update the accuracy stabilizer
    const stabilized = this.accuracyStabilizer.update(
      hasOccludedLandmarks ? null : rawEvaluation.score,
      !hasOccludedLandmarks
    );

    // If completely unavailable beyond grace period, return null
    if (stabilized.stableAccuracy === null) {
      return null;
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
      if (persistence >= ISSUE_PERSISTENCE_THRESHOLD || topIssue.severity === "high") {
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

    // 5. Hold Progress & Completion Eligibility
    const displayedScore = stabilized.displayedAccuracy ?? Math.round(stabilized.stableAccuracy);
    const isValid = !hasOccludedLandmarks && displayedScore >= 75;

    if (isValid && !primaryIssue) {
      this.holdFramesCount++;
    } else {
      this.holdFramesCount = Math.max(0, this.holdFramesCount - 2);
    }

    const holdProgress = Math.min(100, (this.holdFramesCount / this.targetHoldFrames) * 100);
    const completionEligible = holdProgress >= 100;

    return {
      asanaId,
      score: displayedScore, // Stable integer for backward compatibility
      rawScore: rawEvaluation.score,
      stableScore: stabilized.stableAccuracy,
      displayedScore,
      isValid: !hasOccludedLandmarks,
      primaryIssue,
      secondaryIssues,
      resolvedIssues,
      scoreTrend,
      stability: stabilized.isStable ? 100 : 70,
      holdProgress,
      completionEligible,
      activeRules: rules.length,
      evaluatedAt: Date.now(),
    };
  }
}
