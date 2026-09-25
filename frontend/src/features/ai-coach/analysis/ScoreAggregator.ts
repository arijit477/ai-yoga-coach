/**
 * Score Aggregation and Buffering Utilities
 *
 * Implements robust rolling accuracy score buffering, median / trimmed mean aggregation,
 * and 75% threshold crossing completion detection.
 */

/**
 * Calculate median of an array of numbers
 */
export function calculateMedian(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sorted = [...scores].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Calculate trimmed mean of an array of numbers (e.g. dropping top/bottom 10%)
 */
export function calculateTrimmedMean(
  scores: number[],
  trimRatio: number = 0.1,
): number {
  if (scores.length === 0) return 0;
  if (scores.length <= 2) {
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  const sorted = [...scores].sort((a, b) => a - b);
  const trimCount = Math.floor(sorted.length * trimRatio);
  const trimmed = sorted.slice(trimCount, sorted.length - trimCount);
  if (trimmed.length === 0) return calculateMedian(scores);
  const sum = trimmed.reduce((a, b) => a + b, 0);
  return sum / trimmed.length;
}

export interface ScoreBufferConfig {
  maxSize?: number;
  completionThreshold?: number;
  trimRatio?: number;
}

/**
 * ScoreBuffer
 *
 * Maintains a rolling buffer of valid frame scores during active practice.
 * Provides stable aggregation (median / trimmed mean) for the final asana score.
 */
export class ScoreBuffer {
  private buffer: number[] = [];
  private readonly maxSize: number;
  private readonly completionThreshold: number;
  private readonly trimRatio: number;
  private previousScore: number | null = null;
  private hasCompleted: boolean = false;

  constructor(config?: ScoreBufferConfig) {
    this.maxSize = config?.maxSize ?? 30;
    this.completionThreshold = config?.completionThreshold ?? 75;
    this.trimRatio = config?.trimRatio ?? 0.1;
  }

  /**
   * Pushes a new score into the buffer if valid and evaluable.
   */
  public push(score: number | null | undefined, isValid: boolean = true): void {
    if (
      score === null ||
      score === undefined ||
      isNaN(score) ||
      !isValid ||
      score < 0
    ) {
      return;
    }
    const clamped = Math.max(0, Math.min(100, score));
    this.buffer.push(clamped);
    if (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }
  }

  /**
   * Computes the aggregated final score (median / trimmed mean) clamped between 0 and 100.
   */
  public getFinalScore(): number | null {
    if (this.buffer.length === 0) return null;
    const trimmed = calculateTrimmedMean(this.buffer, this.trimRatio);
    return Math.max(0, Math.min(100, Math.round(trimmed)));
  }

  /**
   * Evaluates if a 75% completion threshold crossing has occurred.
   *
   * Threshold crossing criteria:
   * 1. Not already completed for current asana.
   * 2. Has at least 3 valid samples in buffer.
   * 3. Aggregated score reaches >= 75%.
   * 4. Previous state was < 75% or null.
   */
  public checkThresholdCrossing(currentScore: number | null | undefined): {
    didCross: boolean;
    finalScore: number;
  } {
    if (this.hasCompleted) {
      return { didCross: false, finalScore: this.getFinalScore() ?? 0 };
    }

    if (currentScore === null || currentScore === undefined || isNaN(currentScore)) {
      return { didCross: false, finalScore: 0 };
    }

    const aggregated = this.getFinalScore();
    if (aggregated === null) {
      return { didCross: false, finalScore: 0 };
    }

    const wasBelow =
      this.previousScore === null || this.previousScore < this.completionThreshold;
    const isNowAbove = aggregated >= this.completionThreshold;

    this.previousScore = aggregated;

    if (wasBelow && isNowAbove && this.buffer.length >= 3) {
      this.hasCompleted = true;
      return { didCross: true, finalScore: aggregated };
    }

    return { didCross: false, finalScore: aggregated };
  }

  /**
   * Returns current buffer samples
   */
  public getRecentScores(): number[] {
    return [...this.buffer];
  }

  /**
   * Number of valid samples in the buffer
   */
  public size(): number {
    return this.buffer.length;
  }

  public isCompleted(): boolean {
    return this.hasCompleted;
  }

  public setCompleted(completed: boolean): void {
    this.hasCompleted = completed;
  }

  /**
   * Resets the buffer and completion status (e.g. on new asana or restart)
   */
  public reset(): void {
    this.buffer = [];
    this.previousScore = null;
    this.hasCompleted = false;
  }
}
