import type {
  PoseRule,
  PoseEvaluationResult,
  PoseEvaluatorContext,
  PoseIssue,
  RuleSeverity,
} from "../types/pose-rules";
import { evaluatePose } from "./PoseEvaluator";

const EMA_ALPHA = 0.2; // Smoothing factor for overall score
const ISSUE_PERSISTENCE_THRESHOLD = 10; // Frames an issue must persist to become primary

export class TemporalPoseEvaluator {
  private smoothedScore: number | null = null;
  private previousSmoothedScore: number | null = null;
  private issuePersistence: Map<string, number> = new Map();
  private previouslyFailingRules: Set<string> = new Set();
  private holdFramesCount: number = 0;

  constructor(
    private readonly targetHoldFrames: number = 150 // Approx 5 seconds at 30fps
  ) {}

  public reset() {
    this.smoothedScore = null;
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

    if (rawEvaluation.score === 0 && rawEvaluation.issues.length === 0) {
      // Meaning no rules could be evaluated (landmarks occluded)
      return null;
    }

    // 1. Smooth Score
    if (this.smoothedScore === null) {
      this.smoothedScore = rawEvaluation.score;
    } else {
      this.previousSmoothedScore = this.smoothedScore;
      this.smoothedScore =
        this.smoothedScore + EMA_ALPHA * (rawEvaluation.score - this.smoothedScore);
    }

    // 2. Score Trend
    let scoreTrend: "improving" | "declining" | "stable" = "stable";
    if (this.previousSmoothedScore !== null) {
      const diff = this.smoothedScore - this.previousSmoothedScore;
      if (diff > 1) scoreTrend = "improving";
      else if (diff < -1) scoreTrend = "declining";
    }

    // 3. Track Issue Persistence
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

    // 4. Identify Primary and Secondary Issues
    // Sort issues by: Severity (High > Medium > Low), then persistence, then lowest score
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

      // 3. Current Value Deviation (proxy by which rule's current score was worse, though evaluatePose doesn't export rule scores inside the issue currently)
      // Since we don't have individual score in PoseIssue, we'll leave it at severity and persistence for now.
      return 0;
    });

    let primaryIssue: PoseIssue | null = null;
    let secondaryIssues: PoseIssue[] = [];

    if (sortedIssues.length > 0) {
      // Only set as primary if it has persisted enough, or if it's high severity
      const topIssue = sortedIssues[0];
      const persistence = this.issuePersistence.get(topIssue.ruleId) || 0;
      if (persistence >= ISSUE_PERSISTENCE_THRESHOLD || topIssue.severity === "high") {
         primaryIssue = topIssue;
         secondaryIssues = sortedIssues.slice(1);
      } else {
         secondaryIssues = sortedIssues;
      }
    }

    // 5. Track Resolved Issues
    const resolvedIssues: string[] = [];
    for (const id of this.previouslyFailingRules) {
      if (!currentIssueIds.has(id)) {
        resolvedIssues.push(id);
      }
    }
    this.previouslyFailingRules = currentIssueIds;

    // 6. Hold Progress
    const roundedScore = Math.round(this.smoothedScore);
    const isValid = roundedScore >= 75; // Threshold for validity

    if (isValid && !primaryIssue) {
      this.holdFramesCount++;
    } else {
      // Degrade hold progress slowly if they mess up
      this.holdFramesCount = Math.max(0, this.holdFramesCount - 2);
    }

    const holdProgress = Math.min(100, (this.holdFramesCount / this.targetHoldFrames) * 100);
    const completionEligible = holdProgress >= 100;

    return {
      asanaId,
      score: roundedScore,
      isValid,
      primaryIssue,
      secondaryIssues,
      resolvedIssues,
      scoreTrend,
      stability: 100, // This represents landmark jitter stability, separate from score. (Placeholder if needed)
      holdProgress,
      completionEligible,
      activeRules: rules.length,
      evaluatedAt: Date.now(),
    };
  }
}
