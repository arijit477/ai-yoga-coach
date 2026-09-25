export interface AccuracyStabilizerConfig {
  /**
   * Exponential moving average smoothing factor.
   * Default: 0.15 (smooth yet responsive)
   */
  smoothingAlpha: number;

  /**
   * Threshold deviation for considering a change as large.
   * Default: 15 percentage points
   */
  largeChangeThreshold: number;

  /**
   * Threshold deviation for considering a change as severe.
   * Default: 25 percentage points
   */
  severeChangeThreshold: number;

  /**
   * Number of consistent frames required for a large change to apply.
   * Default: 6 frames (~200ms at 30fps)
   */
  largeChangePersistenceFrames: number;

  /**
   * Number of consistent frames required for a severe change to apply.
   * Default: 4 frames (~133ms at 30fps)
   */
  severeChangePersistenceFrames: number;

  /**
   * Dead band around displayed percentage to prevent visual toggling (e.g. 73 <-> 74).
   * Default: 1.0 percentage point
   */
  deadBand: number;

  /**
   * Grace duration (ms) during temporary tracking failure before score drops to null.
   * Default: 1500 ms (1.5 seconds)
   */
  invalidFrameGraceMs: number;
}

export const DEFAULT_STABILIZER_CONFIG: AccuracyStabilizerConfig = {
  smoothingAlpha: 0.30, // Responsive exponential moving average for fluid live response
  largeChangeThreshold: 20,
  severeChangeThreshold: 35,
  largeChangePersistenceFrames: 3, // Rapid response to genuine posture changes
  severeChangePersistenceFrames: 2,
  deadBand: 1.0, // Prevent integer text flicker
  invalidFrameGraceMs: 600, // Quick reset when posture tracking drops
};

export interface StableAccuracyState {
  /**
   * High-precision unfiltered raw accuracy score for this frame (0 - 100).
   */
  rawAccuracy: number | null;

  /**
   * Temporally smoothed, outlier-filtered continuous float accuracy (0 - 100).
   * Ideal for sub-pixel fluid SVG animations.
   */
  stableAccuracy: number | null;

  /**
   * Stable integer percentage for UI text display, protected by dead-band hysteresis.
   */
  displayedAccuracy: number | null;

  /**
   * True if the frame-to-frame score variance is within normal steady-state range.
   */
  isStable: boolean;

  /**
   * Confidence level of the current tracking (0.0 to 1.0).
   */
  confidence: number;
}

/**
 * AccuracyStabilizer
 * 
 * Manages frame-to-frame accuracy stabilization:
 * - Separates rawAccuracy (unfiltered float) from stableAccuracy.
 * - Applies Exponential Moving Average (EMA) smoothing (alpha = 0.15).
 * - Filters transient single-frame landmark noise and tracking flickers.
 * - Requires temporal persistence (multi-frame confirmation) before accepting large/severe deviations.
 * - Implements dead-band hysteresis on displayed integer percentage.
 * - Holds previous score gracefully during momentary tracking drops rather than jumping to 0%.
 */
export class AccuracyStabilizer {
  private config: AccuracyStabilizerConfig;

  private currentStable: number | null = null;
  private currentDisplayed: number | null = null;
  private lastValidRaw: number | null = null;
  private lastValidTime: number = 0;

  // Persistence tracking for candidate deviations
  private candidateTarget: number | null = null;
  private candidatePersistenceCount: number = 0;

  constructor(customConfig?: Partial<AccuracyStabilizerConfig>) {
    this.config = { ...DEFAULT_STABILIZER_CONFIG, ...customConfig };
  }

  /**
   * Resets the stabilizer state (e.g. when changing asanas or starting a new session).
   */
  public reset(): void {
    this.currentStable = null;
    this.currentDisplayed = null;
    this.lastValidRaw = null;
    this.lastValidTime = 0;
    this.candidateTarget = null;
    this.candidatePersistenceCount = 0;
  }

  /**
   * Processes a new frame raw accuracy value and produces a stabilized accuracy state.
   *
   * @param rawScore Unrounded raw accuracy (0-100), or null if tracking is lost/occluded.
   * @param isValid Whether the frame has valid tracking landmarks.
   * @param now Current timestamp in ms (defaults to Date.now()).
   */
  public update(
    rawScore: number | null,
    isValid: boolean = true,
    now: number = Date.now()
  ): StableAccuracyState {
    const isFrameValid = isValid && rawScore !== null && !isNaN(rawScore) && rawScore >= 0;

    // Handle invalid / low-confidence frame
    if (!isFrameValid) {
      // If we have a previously stable score and we are within the grace window, hold it!
      const timeSinceValid = now - this.lastValidTime;
      if (this.currentStable !== null && timeSinceValid <= this.config.invalidFrameGraceMs) {
        return {
          rawAccuracy: rawScore,
          stableAccuracy: this.currentStable,
          displayedAccuracy: this.currentDisplayed,
          isStable: false,
          confidence: Math.max(0, 1 - timeSinceValid / this.config.invalidFrameGraceMs),
        };
      }

      // Grace period exceeded: return null/standby without flashing 0
      if (timeSinceValid > this.config.invalidFrameGraceMs) {
        this.currentStable = null;
        this.currentDisplayed = null;
      }

      return {
        rawAccuracy: null,
        stableAccuracy: this.currentStable,
        displayedAccuracy: this.currentDisplayed,
        isStable: false,
        confidence: 0,
      };
    }

    // Valid frame received
    this.lastValidTime = now;
    const clampedRaw = Math.max(0, Math.min(100, rawScore));
    this.lastValidRaw = clampedRaw;

    // 1. Initial frame: bootstrap stable value directly
    if (this.currentStable === null) {
      this.currentStable = clampedRaw;
      this.currentDisplayed = Math.round(clampedRaw);
      this.candidateTarget = null;
      this.candidatePersistenceCount = 0;

      return {
        rawAccuracy: clampedRaw,
        stableAccuracy: this.currentStable,
        displayedAccuracy: this.currentDisplayed,
        isStable: true,
        confidence: 1.0,
      };
    }

    // 2. Outlier rejection & persistence check
    const diff = clampedRaw - this.currentStable;
    const absDiff = Math.abs(diff);

    let effectiveAlpha = this.config.smoothingAlpha;
    let isStable = true;

    if (absDiff > this.config.largeChangeThreshold) {
      isStable = false;

      // Determine required persistence frames based on severity
      const requiredFrames =
        absDiff > this.config.severeChangeThreshold
          ? this.config.severeChangePersistenceFrames
          : this.config.largeChangePersistenceFrames;

      // Check if this new frame is in the same direction of deviation
      if (
        this.candidateTarget !== null &&
        Math.sign(clampedRaw - this.currentStable) === Math.sign(this.candidateTarget - this.currentStable)
      ) {
        this.candidatePersistenceCount++;
      } else {
        // New candidate deviation
        this.candidateTarget = clampedRaw;
        this.candidatePersistenceCount = 1;
      }

      if (this.candidatePersistenceCount >= requiredFrames) {
        // Change has persisted! Accept the posture change and transition smoothly
        effectiveAlpha = 0.45;
      } else {
        // Transient outlier: apply mild damping while awaiting confirmation
        effectiveAlpha = 0.15;
      }
    } else {
      // Normal change within threshold: clear any candidate tracking
      this.candidateTarget = null;
      this.candidatePersistenceCount = 0;
    }

    // 3. Temporal Exponential Moving Average (EMA)
    this.currentStable = this.currentStable + effectiveAlpha * (clampedRaw - this.currentStable);
    this.currentStable = Math.max(0, Math.min(100, this.currentStable));

    // 4. Dead-band Hysteresis for Displayed Integer
    this.currentDisplayed = this.calculateDeadBandDisplay(
      this.currentStable,
      this.currentDisplayed,
      this.config.deadBand
    );

    return {
      rawAccuracy: clampedRaw,
      stableAccuracy: this.currentStable,
      displayedAccuracy: this.currentDisplayed,
      isStable,
      confidence: 1.0,
    };
  }

  /**
   * Applies dead-band hysteresis to prevent integer flicker around boundaries.
   * Only transitions to a new integer when the float value crosses beyond (integer ± 0.5 + deadBandOffset).
   */
  private calculateDeadBandDisplay(
    newStable: number,
    currentDisplayed: number | null,
    deadBand: number
  ): number {
    if (currentDisplayed === null) {
      return Math.round(newStable);
    }

    const rounded = Math.round(newStable);
    if (rounded === currentDisplayed) {
      return currentDisplayed;
    }

    // Difference from current displayed value
    const delta = newStable - currentDisplayed;

    // Must exceed half the step plus half the dead-band to trigger a change
    const threshold = 0.5 + Math.min(0.45, deadBand * 0.25);

    if (Math.abs(delta) >= threshold) {
      return rounded;
    }

    return currentDisplayed;
  }

  public getState(): StableAccuracyState {
    return {
      rawAccuracy: this.lastValidRaw,
      stableAccuracy: this.currentStable,
      displayedAccuracy: this.currentDisplayed,
      isStable: this.candidatePersistenceCount === 0,
      confidence: this.currentStable !== null ? 1.0 : 0.0,
    };
  }
}
