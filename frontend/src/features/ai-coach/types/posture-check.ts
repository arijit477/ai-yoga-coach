/**
 * Represents the alignment status of a single body area.
 *
 * - "good"     -> Area is correctly aligned, no action needed.
 * - "warning"  -> Moderate deviation detected; prompt for adjustment.
 * - "critical" -> Significant misalignment; requires immediate correction.
 * - "unknown"  -> Landmarks are not visible or confidence is too low.
 */
export type PostureStatus = "good" | "warning" | "critical" | "unknown";

export interface PostureCheckItem {
  /** Unique key for the body area */
  key: string;
  /** Human-readable label shown in the UI */
  label: string;
  /** Current alignment status */
  status: PostureStatus;
  /** Optional short hint shown on warning/critical */
  hint?: string;
}

export interface PostureCheckResult {
  items: PostureCheckItem[];
  /** True when landmarks are present and at least some items could be evaluated */
  hasData: boolean;
}
