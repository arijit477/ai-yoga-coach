import type {
  CoachingContext,
  CoachingIssue,
  CoachingState,
} from "./CoachingContext";

export class CoachingContextManager {
  private context: CoachingContext | null = null;

  startPose(asanaName: string): void {
    this.context = {
      asanaName,
      state: "STARTING",
      activeIssues: [],
      correctedIssues: [],
    };
  }

  setState(state: CoachingState): void {
    if (!this.context) return;

    this.context.state = state;
  }

  setIssues(issues: CoachingIssue[]): void {
    if (!this.context) return;

    this.context.activeIssues = issues;

    if (issues.length > 0) {
      this.context.lastIssueId = issues[0].id;
    }
  }

  markIssueCorrected(issueId: string): void {
    if (!this.context) return;

    this.context.activeIssues =
      this.context.activeIssues.filter(
        issue => issue.id !== issueId
      );

    if (!this.context.correctedIssues.includes(issueId)) {
      this.context.correctedIssues.push(issueId);
    }
  }

  updateHold(
    holdSeconds: number,
    remainingHoldSeconds?: number
  ): void {
    if (!this.context) return;

    this.context.holdSeconds = holdSeconds;
    this.context.remainingHoldSeconds =
      remainingHoldSeconds;

    this.context.state = "HOLDING";
  }

  setScore(score: number): void {
    if (!this.context) return;

    this.context.score = score;
  }

  getContext(): CoachingContext | null {
    if (!this.context) return null;

    return {
      ...this.context,
      activeIssues: [...this.context.activeIssues],
      correctedIssues: [...this.context.correctedIssues],
    };
  }

  reset(): void {
    this.context = null;
  }
}
