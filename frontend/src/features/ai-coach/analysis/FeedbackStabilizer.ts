import type {
  PoseEvaluation,
  PoseIssue,
} from "../types/pose-rules";

interface StabilizerConfig {
  requiredFrames: number;
  releaseFrames: number;
}

const DEFAULT_CONFIG: StabilizerConfig = {
  requiredFrames: 4,
  releaseFrames: 3,
};

export class FeedbackStabilizer {
  private readonly config: StabilizerConfig;

  private currentRuleId: string | null = null;
  private candidateRuleId: string | null = null;

  private candidateCount = 0;
  private clearCount = 0;

  constructor(config: Partial<StabilizerConfig> = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  stabilize(evaluation: PoseEvaluation): PoseEvaluation {
    const issues = this.selectStableIssues(evaluation.issues);

    return {
      ...evaluation,
      issues,
    };
  }

  reset(): void {
    this.currentRuleId = null;
    this.candidateRuleId = null;
    this.candidateCount = 0;
    this.clearCount = 0;
  }

  private selectStableIssues(
    issues: PoseIssue[],
  ): PoseIssue[] {
    const primaryIssue = issues[0];

    // No issue detected
    if (!primaryIssue) {
      this.clearCount += 1;

      if (this.clearCount >= this.config.releaseFrames) {
        this.currentRuleId = null;
        this.candidateRuleId = null;
        this.candidateCount = 0;
      }

      return this.currentRuleId ? issues : [];
    }

    this.clearCount = 0;

    // Same issue is already active
    if (primaryIssue.ruleId === this.currentRuleId) {
      return [primaryIssue];
    }

    // New candidate issue
    if (primaryIssue.ruleId === this.candidateRuleId) {
      this.candidateCount += 1;
    } else {
      this.candidateRuleId = primaryIssue.ruleId;
      this.candidateCount = 1;
    }

    // Require the issue to persist for several frames
    if (this.candidateCount >= this.config.requiredFrames) {
      this.currentRuleId = primaryIssue.ruleId;
      this.candidateRuleId = null;
      this.candidateCount = 0;

      return [primaryIssue];
    }

    // Don't immediately replace the currently active correction
    if (this.currentRuleId) {
      return issues.filter(
        (issue) => issue.ruleId === this.currentRuleId,
      );
    }

    return [];
  }
}