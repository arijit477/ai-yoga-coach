import type {
  PoseEvaluation,
  PoseEvaluationResult,
  PostureAreaStatus,
} from "../types/pose-rules";
import type { PostureCheckItem, PostureCheckResult, PostureStatus } from "../types/posture-check";

export interface PostureCheckConfig {
  persistenceFrames?: number;
}

const BODY_AREAS: { key: keyof PoseEvaluation["posture"]; label: string }[] = [
  { key: "head", label: "Head Position" },
  { key: "neck", label: "Neck Alignment" },
  { key: "shoulders", label: "Shoulder Balance" },
  { key: "elbows", label: "Arm Alignment" },
  { key: "spine", label: "Spine Alignment" },
  { key: "hips", label: "Hip Position" },
  { key: "knees", label: "Knee Position" },
  { key: "ankles", label: "Ankle Position" },
];

/**
 * PostureStatusDebouncer
 *
 * Prevents frame-to-frame indicator flickering (e.g. good -> bad -> good)
 * by requiring candidate state transitions to persist for N consecutive frames
 * before updating visible UI presentation.
 */
export class PostureStatusDebouncer {
  private currentStates: Map<string, PostureStatus> = new Map();
  private candidateStates: Map<string, { status: PostureStatus; count: number }> = new Map();
  private readonly persistenceFrames: number;

  constructor(persistenceFrames: number = 3) {
    this.persistenceFrames = persistenceFrames;
  }

  public debounce(key: string, targetStatus: PostureStatus): PostureStatus {
    const current = this.currentStates.get(key) ?? "unknown";

    // Immediate update on first initialization or when status matches
    if (!this.currentStates.has(key)) {
      this.currentStates.set(key, targetStatus);
      return targetStatus;
    }

    if (current === targetStatus) {
      this.candidateStates.delete(key);
      return current;
    }

    // Check candidate state persistence
    const candidate = this.candidateStates.get(key);
    if (candidate && candidate.status === targetStatus) {
      candidate.count += 1;
      if (candidate.count >= this.persistenceFrames) {
        this.currentStates.set(key, targetStatus);
        this.candidateStates.delete(key);
        return targetStatus;
      }
      return current;
    } else {
      this.candidateStates.set(key, { status: targetStatus, count: 1 });
      return current;
    }
  }

  public reset(): void {
    this.currentStates.clear();
    this.candidateStates.clear();
  }
}

/**
 * Maps PostureAreaStatus to PostureStatus
 */
export function mapAreaStatus(status: PostureAreaStatus | undefined): PostureStatus {
  switch (status) {
    case "good":
      return "good";
    case "warning":
      return "warning";
    case "bad":
      return "bad";
    case "unknown":
    default:
      return "unknown";
  }
}

function matchesArea(areaKey: string, ruleOrJoint: string): boolean {
  if (!ruleOrJoint) return false;
  const target = ruleOrJoint.toLowerCase();
  const baseKey = areaKey.toLowerCase().replace(/s$/, "");
  return (
    target.includes(baseKey) ||
    target.includes(areaKey.toLowerCase()) ||
    (baseKey === "elbow" && (target.includes("arm") || target.includes("elbow"))) ||
    (baseKey === "spine" && (target.includes("torso") || target.includes("spine"))) ||
    (baseKey === "knee" && (target.includes("leg") || target.includes("knee"))) ||
    (baseKey === "ankle" && (target.includes("foot") || target.includes("ankle")))
  );
}

/**
 * Derives PostureCheckResult from PoseEvaluation
 *
 * Single Source of Truth: UI components consume PoseEvaluation directly
 * without calculating angles, distances, or alignments.
 */
export function getPostureCheckResult(
  evaluation: PoseEvaluation | PoseEvaluationResult | null,
  debouncer?: PostureStatusDebouncer,
): PostureCheckResult {
  if (!evaluation) {
    return {
      items: BODY_AREAS.map((area) => ({
        key: area.key,
        label: area.label,
        status: "unknown",
      })),
      hasData: false,
    };
  }

  // Extract posture map if present
  const posture = (evaluation as PoseEvaluation).posture;
  const primaryIssue = evaluation.primaryIssue;

  const items: PostureCheckItem[] = BODY_AREAS.map((area) => {
    let rawStatus: PostureStatus = "unknown";
    if (posture && posture[area.key]) {
      rawStatus = mapAreaStatus(posture[area.key]);
    } else if (primaryIssue) {
      // Check if primary issue relates to this area
      const ruleId = primaryIssue.ruleId || "";
      const joint = primaryIssue.joint || "";
      if (matchesArea(area.key, ruleId) || matchesArea(area.key, joint)) {
        rawStatus = primaryIssue.severity === "high" ? "bad" : "warning";
      } else {
        rawStatus = evaluation.score >= 75 ? "good" : "warning";
      }
    } else {
      rawStatus = evaluation.score >= 75 ? "good" : "warning";
    }

    const stabilizedStatus = debouncer ? debouncer.debounce(area.key, rawStatus) : rawStatus;

    let hint: string | undefined;
    if (primaryIssue) {
      const ruleId = primaryIssue.ruleId || "";
      const joint = primaryIssue.joint || "";
      if (matchesArea(area.key, ruleId) || matchesArea(area.key, joint)) {
        hint = primaryIssue.feedback;
      }
    }

    return {
      key: area.key,
      label: area.label,
      status: stabilizedStatus,
      hint,
    };
  });

  return {
    items,
    hasData: true,
  };
}
