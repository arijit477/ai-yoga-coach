/**
 * Represents the alignment status of a single body area.
 *
 * - "good"     -> Area is correctly aligned, green indicator.
 * - "warning"  -> Moderate deviation detected; yellow indicator.
 * - "bad"      -> Misalignment detected; red indicator.
 * - "critical" -> Significant misalignment; red indicator.
 * - "unknown"  -> Landmarks are not visible or rule unapplicable; grey indicator.
 */
export type PostureStatus = "good" | "warning" | "bad" | "critical" | "unknown";

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
  /** True when landmarks are present and evaluation data is available */
  hasData: boolean;
}
