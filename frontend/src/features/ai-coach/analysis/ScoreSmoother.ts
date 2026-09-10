export interface ScoreSmootherConfig {
  windowSize: number;
  maxChangePerFrame: number;
}

const DEFAULT_CONFIG: ScoreSmootherConfig = {
  windowSize: 8,
  maxChangePerFrame: 5,
};

export class ScoreSmoother {
  private readonly config: ScoreSmootherConfig;

  private scores: number[] = [];
  private currentScore = 0;
  private initialized = false;

  constructor(config: Partial<ScoreSmootherConfig> = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  smooth(score: number): number {
    if (!Number.isFinite(score)) {
      return this.currentScore;
    }

    const normalizedScore = Math.max(
      0,
      Math.min(100, score),
    );

    if (!this.initialized) {
      this.currentScore = normalizedScore;
      this.initialized = true;
      this.scores = [normalizedScore];

      return Math.round(this.currentScore);
    }

    this.scores.push(normalizedScore);

    if (this.scores.length > this.config.windowSize) {
      this.scores.shift();
    }

    const average =
      this.scores.reduce(
        (sum, value) => sum + value,
        0,
      ) / this.scores.length;

    const difference = average - this.currentScore;

    const limitedChange = Math.max(
      -this.config.maxChangePerFrame,
      Math.min(
        this.config.maxChangePerFrame,
        difference,
      ),
    );

    this.currentScore += limitedChange;

    this.currentScore = Math.max(
      0,
      Math.min(100, this.currentScore),
    );

    return Math.round(this.currentScore);
  }

  reset(): void {
    this.scores = [];
    this.currentScore = 0;
    this.initialized = false;
  }

  get value(): number {
    return Math.round(this.currentScore);
  }
}