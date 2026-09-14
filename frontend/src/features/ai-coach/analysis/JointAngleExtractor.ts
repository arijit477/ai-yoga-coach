import type { PoseLandmarks } from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";
import type { PoseRule, PoseIssue } from "../types/pose-rules";
import { calculateLandmarkAngle } from "./AngleCalculator";
import type {
  JointAngleKey,
  JointAngleConfig,
  JointAngleValue,
  JointAngleStatus,
} from "../types/joint-angles";

export const SUPPORTED_JOINTS: JointAngleConfig[] = [
  {
    key: "leftShoulder",
    label: "Left Shoulder",
    vertexIndex: P.LEFT_SHOULDER,
    points: [P.LEFT_ELBOW, P.LEFT_SHOULDER, P.LEFT_HIP],
  },
  {
    key: "rightShoulder",
    label: "Right Shoulder",
    vertexIndex: P.RIGHT_SHOULDER,
    points: [P.RIGHT_ELBOW, P.RIGHT_SHOULDER, P.RIGHT_HIP],
  },
  {
    key: "leftElbow",
    label: "Left Elbow",
    vertexIndex: P.LEFT_ELBOW,
    points: [P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST],
  },
  {
    key: "rightElbow",
    label: "Right Elbow",
    vertexIndex: P.RIGHT_ELBOW,
    points: [P.RIGHT_SHOULDER, P.RIGHT_ELBOW, P.RIGHT_WRIST],
  },
  {
    key: "leftHip",
    label: "Left Hip",
    vertexIndex: P.LEFT_HIP,
    points: [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE],
  },
  {
    key: "rightHip",
    label: "Right Hip",
    vertexIndex: P.RIGHT_HIP,
    points: [P.RIGHT_SHOULDER, P.RIGHT_HIP, P.RIGHT_KNEE],
  },
  {
    key: "leftKnee",
    label: "Left Knee",
    vertexIndex: P.LEFT_KNEE,
    points: [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE],
  },
  {
    key: "rightKnee",
    label: "Right Knee",
    vertexIndex: P.RIGHT_KNEE,
    points: [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE],
  },
  {
    key: "leftAnkle",
    label: "Left Ankle",
    vertexIndex: P.LEFT_ANKLE,
    points: [P.LEFT_KNEE, P.LEFT_ANKLE, P.LEFT_FOOT_INDEX],
  },
  {
    key: "rightAnkle",
    label: "Right Ankle",
    vertexIndex: P.RIGHT_ANKLE,
    points: [P.RIGHT_KNEE, P.RIGHT_ANKLE, P.RIGHT_FOOT_INDEX],
  },
];

export const ASANA_RELEVANT_JOINTS: Record<string, JointAngleKey[]> = {
  "warrior-ii": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftAnkle",
    "rightAnkle",
  ],
  tadasana: [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
  ],
  vrksasana: [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
  ],
  trikonasana: [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
  ],
  "adho-mukha-svanasana": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
  ],
  "step-01-prayer-pranamasana": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
  ],
  "step-02-raised-arms-hastauttanasana": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
  ],
  "step-03-standing-forward-bend-hastapadasana": [
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftShoulder",
    "rightShoulder",
  ],
  "step-04-equestrian-right-back-ashwa-sanchalanasana": [
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftAnkle",
    "rightAnkle",
  ],
  "step-05-plank-dandasana": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
  ],
  "step-06-eight-limbed-salute-ashtanga-namaskara": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
  ],
  "step-07-cobra-bhujangasana": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
  ],
  "step-08-downward-dog-adho-mukha-svanasana": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
  ],
  "step-09-equestrian-left-back-ashwa-sanchalanasana": [
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftAnkle",
    "rightAnkle",
  ],
  "step-10-standing-forward-bend-hastapadasana": [
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftShoulder",
    "rightShoulder",
  ],
  "step-11-raised-arms-hastauttanasana": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
  ],
  "step-12-mountain-tadasana": [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
  ],
};

const DEFAULT_RELEVANT_JOINTS: JointAngleKey[] = [
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "leftHip",
  "rightHip",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle",
];

const WARNING_TOLERANCE_DEG = 12; // Degrees beyond threshold before turning Red

/**
 * Extracts and evaluates all relevant joint angles using the authoritative 3D landmark angle engine.
 */
export function extractJointAngles(
  landmarks: PoseLandmarks | null,
  activeRules: PoseRule[] = [],
  activeIssues: PoseIssue[] = [],
  asanaId: string = "warrior-ii",
): JointAngleValue[] {
  if (!landmarks || landmarks.length < 33) {
    return [];
  }

  const relevantKeys = ASANA_RELEVANT_JOINTS[asanaId] || DEFAULT_RELEVANT_JOINTS;
  const relevantSet = new Set(relevantKeys);

  const angleRules = activeRules.filter((r) => r.metric === "angle" && r.points.length === 3);

  return SUPPORTED_JOINTS.filter((joint) => relevantSet.has(joint.key)).map((joint) => {
    const [pA, pB, pC] = joint.points;
    const lA = landmarks[pA];
    const lB = landmarks[pB];
    const lC = landmarks[pC];

    // Check visibility if available
    const isVisible =
      (lA.visibility === undefined || lA.visibility >= 0.4) &&
      (lB.visibility === undefined || lB.visibility >= 0.4) &&
      (lC.visibility === undefined || lC.visibility >= 0.4);

    if (!isVisible) {
      return {
        key: joint.key,
        label: joint.label,
        vertexIndex: joint.vertexIndex,
        points: joint.points,
        angle: null,
        status: "unknown" as JointAngleStatus,
      };
    }

    const rawAngle = calculateLandmarkAngle(lA, lB, lC);
    if (rawAngle === null || !Number.isFinite(rawAngle)) {
      return {
        key: joint.key,
        label: joint.label,
        vertexIndex: joint.vertexIndex,
        points: joint.points,
        angle: null,
        status: "unknown" as JointAngleStatus,
      };
    }

    const angle = Math.round(rawAngle);

    const primaryIssue = activeIssues.length > 0 ? activeIssues[0] : null;

    // Find any matching rule for this joint
    // A rule matches if its points have the same vertex (points[1]) and outer points
    const matchingRule = angleRules.find((rule) => {
      const [rA, rB, rC] = rule.points;
      if (rB !== pB) return false;
      return (rA === pA && rC === pC) || (rA === pC && rC === pA);
    });

    let status: JointAngleStatus = "good";
    let min: number | undefined = undefined;
    let max: number | undefined = undefined;
    let target: number | undefined = undefined;
    let feedback: string | undefined = undefined;
    let ruleId: string | undefined = undefined;
    let isPrimaryIssue = false;

    // Check if this joint is associated with the primary active issue
    if (primaryIssue) {
      const issueKey = primaryIssue.ruleId.toLowerCase().replace(/[-_]/g, "");
      const jointKeyStr = joint.key.toLowerCase();
      const jointLabelStr = joint.label.toLowerCase().replace(/\s+/g, "");
      if (
        (matchingRule && primaryIssue.ruleId === matchingRule.id) ||
        issueKey.includes(jointKeyStr) ||
        issueKey.includes(jointLabelStr) ||
        primaryIssue.ruleName.toLowerCase().includes(joint.label.toLowerCase())
      ) {
        isPrimaryIssue = true;
      }
    }

    if (matchingRule) {
      ruleId = matchingRule.id;
      min = matchingRule.min;
      max = matchingRule.max;
      target = matchingRule.target;
      feedback = matchingRule.feedback;

      // Check if an issue was recorded for this rule
      const matchingIssue = activeIssues.find((iss) => {
        if (iss.ruleId === matchingRule.id) return true;
        const issNorm = iss.ruleId.toLowerCase().replace(/[-_]/g, "");
        const ruleNorm = matchingRule.id.toLowerCase().replace(/[-_]/g, "");
        return issNorm === ruleNorm;
      });

      if (matchingIssue) {
        // Calculate distance from boundary to determine warning (yellow) vs error (red)
        if (min !== undefined && max !== undefined) {
          const delta = angle < min ? min - angle : angle > max ? angle - max : 0;
          status = delta > WARNING_TOLERANCE_DEG ? "error" : "warning";
        } else {
          status = matchingIssue.severity === "high" ? "error" : "warning";
        }
      } else {
        status = "good";
      }
    } else if (isPrimaryIssue && primaryIssue) {
      // Joint matched primary issue directly
      status = primaryIssue.severity === "high" ? "error" : "warning";
      feedback = primaryIssue.feedback;
      min = primaryIssue.min;
      max = primaryIssue.max;
      target = primaryIssue.targetValue;
    } else {
      // Joint does not have an explicit rule in this asana
      status = "good";
    }

    return {
      key: joint.key,
      label: joint.label,
      vertexIndex: joint.vertexIndex,
      points: joint.points,
      angle,
      status,
      ruleId,
      min,
      max,
      target,
      feedback,
      isPrimaryIssue,
    };
  });
}
