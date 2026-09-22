import type { CoachContext, PostureContext, SafetyContext } from "../types/coach-context";

export class CoachContextHelper {
  static cameraUnavailable(): Partial<CoachContext> {
    return {
      camera: {
        isGranted: true,
        isEnabled: true,
        isStreamAvailable: false,
        isUserVisible: false,
        visibilityState: "not_visible",
        areFeetVisible: false,
        cameraReady: false
      }
    };
  }

  static userOutOfFrame(): Partial<CoachContext> {
    return {
      camera: {
        isGranted: true,
        isEnabled: true,
        isStreamAvailable: true,
        isUserVisible: false,
        visibilityState: "not_visible",
        areFeetVisible: false,
        cameraReady: true
      }
    };
  }

  static partialBodyVisible(): Partial<CoachContext> {
    return {
      camera: {
        isGranted: true,
        isEnabled: true,
        isStreamAvailable: true,
        isUserVisible: true,
        visibilityState: "partial_body",
        areFeetVisible: false,
        cameraReady: true
      }
    };
  }

  static cameraReady(): Partial<CoachContext> {
    return {
      camera: {
        isGranted: true,
        isEnabled: true,
        isStreamAvailable: true,
        isUserVisible: true,
        visibilityState: "full_body",
        areFeetVisible: true,
        cameraReady: true
      }
    };
  }

  static calibrationReady(): Partial<CoachContext> {
    return {
      session: {
        state: "calibrating",
        currentAsana: null,
        previousAsana: null,
        coachName: null,
        guideState: null,
        isCalibrationReady: true,
        calibrationProgress: 100,
        completedPosesCount: 0,
        boundingBox: null,
        isMirrored: false,
        isFacingRight: false,
      }
    };
  }

  static poseStarted(asanaId: string): Partial<CoachContext> {
    return {
      pose: {
        currentAsanaId: asanaId,
        isPoseDetected: false,
        confidence: 0,
        currentAccuracy: 0,
        previousAccuracy: 0,
        scoreTrend: "stable",
        isStable: false,
        isHolding: false,
        isCompleted: false
      }
    };
  }

  static postureCorrection(issue: PostureContext): Partial<CoachContext> {
    return {
      posture: issue
    };
  }

  static issueImproving(): Partial<CoachContext> {
    return {
      pose: {
        currentAsanaId: null, // Should be merged with current context
        isPoseDetected: true,
        confidence: 1,
        currentAccuracy: 0, // Merged
        previousAccuracy: 0, // Merged
        scoreTrend: "improving",
        isStable: false,
        isHolding: false,
        isCompleted: false
      }
    };
  }

  static issueResolved(): Partial<CoachContext> {
    return {
      posture: {
        primaryIssue: null,
        secondaryIssues: [],
        affectedBodyPart: null,
        ruleId: null,
        severity: null,
        currentValue: null,
        targetRange: null,
        humanReadableCorrection: null
      }
    };
  }

  static goodForm(): Partial<CoachContext> {
    return {
      pose: {
        currentAsanaId: null, // merged
        isPoseDetected: true,
        confidence: 1,
        currentAccuracy: 100,
        previousAccuracy: 100,
        scoreTrend: "stable",
        isStable: true,
        isHolding: true,
        isCompleted: false
      }
    };
  }

  static poseCompleted(): Partial<CoachContext> {
    return {
      pose: {
        currentAsanaId: null,
        isPoseDetected: true,
        confidence: 1,
        currentAccuracy: 100,
        previousAccuracy: 100,
        scoreTrend: "stable",
        isStable: true,
        isHolding: true,
        isCompleted: true
      }
    };
  }

  static safetyWarning(warningDetails: Partial<SafetyContext>): Partial<CoachContext> {
    return {
      safety: {
        hasSafetyWarning: warningDetails.hasSafetyWarning ?? true,
        userMessagePainOrInjury: warningDetails.userMessagePainOrInjury ?? false,
        safetyState: warningDetails.safetyState ?? "warning"
      }
    };
  }
}
