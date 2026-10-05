import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { CameraReadinessState } from "../../motion/CameraReadinessTracker";
import type { PoseEvaluationResult } from "../../types/pose-rules";
import type { PoseLandmarks } from "../../types/landmarks";
import { CoachingEventEngine } from "../CoachingEventEngine";

describe("Phase 4C.8 — Session Activation Regression Tests", () => {
  const create33Landmarks = (visibility: number = 0.9): PoseLandmarks => {
    return Array.from({ length: 33 }, () => ({
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility,
    }));
  };

  const createMockEvaluation = (isValid: boolean = true): PoseEvaluationResult => {
    return {
      asanaId: "mountain-pose",
      score: 85,
      isValid,
      primaryIssue: null,
      secondaryIssues: [],
      resolvedIssues: [],
      scoreTrend: "stable",
      stability: 90,
      holdProgress: 0,
      completionEligible: true,
      activeRules: 5,
      evaluatedAt: Date.now(),
    };
  };

  /**
   * Pure evaluation helper matching useCoachSession canEnterCoaching logic
   */
  const evaluateCanEnterCoaching = (params: {
    practiceStarted: boolean;
    cameraState: CameraReadinessState;
    hasPose: boolean;
    landmarks: PoseLandmarks | null;
    evaluation: PoseEvaluationResult | null;
  }): boolean => {
    const isCameraReadyForCoaching =
      params.cameraState === "CAMERA_READY" ||
      params.cameraState === "FULL_BODY_DETECTED";

    const isCameraPartial = params.cameraState === "PARTIAL_BODY";

    const poseValid = Boolean(
      params.hasPose &&
      params.landmarks &&
      params.landmarks.length >= 33 &&
      params.evaluation &&
      params.evaluation.isValid !== false
    );

    return (
      params.practiceStarted &&
      isCameraReadyForCoaching &&
      !isCameraPartial &&
      poseValid
    );
  };

  // Test 1: PARTIAL_BODY blocks coaching
  it("Test 1: does not enter coaching when camera is PARTIAL_BODY", () => {
    const canEnter = evaluateCanEnterCoaching({
      practiceStarted: true,
      cameraState: "PARTIAL_BODY",
      hasPose: true,
      landmarks: create33Landmarks(0.9),
      evaluation: createMockEvaluation(true),
    });

    assert.equal(canEnter, false, "PARTIAL_BODY must block coaching entry");
  });

  // Test 2: Practice not started blocks coaching
  it("Test 2: does not enter coaching before practice starts", () => {
    const canEnter = evaluateCanEnterCoaching({
      practiceStarted: false,
      cameraState: "FULL_BODY_DETECTED",
      hasPose: true,
      landmarks: create33Landmarks(0.9),
      evaluation: createMockEvaluation(true),
    });

    assert.equal(canEnter, false, "Unstarted practice must block coaching entry");
  });

  // Test 3: FULL_BODY_DETECTED + practice started enters coaching
  it("Test 3: enters coaching when practice has started and full body is detected", () => {
    const canEnter = evaluateCanEnterCoaching({
      practiceStarted: true,
      cameraState: "FULL_BODY_DETECTED",
      hasPose: true,
      landmarks: create33Landmarks(0.9),
      evaluation: createMockEvaluation(true),
    });

    assert.equal(canEnter, true, "FULL_BODY_DETECTED + practice started should enter coaching");
  });

  // Test 4: CAMERA_READY + practice started enters coaching
  it("Test 4: enters coaching when camera is CAMERA_READY and practice started", () => {
    const canEnter = evaluateCanEnterCoaching({
      practiceStarted: true,
      cameraState: "CAMERA_READY",
      hasPose: true,
      landmarks: create33Landmarks(0.9),
      evaluation: createMockEvaluation(true),
    });

    assert.equal(canEnter, true, "CAMERA_READY + practice started should enter coaching");
  });

  // Test 5: Invalid pose blocks coaching
  it("Test 5: does not enter coaching when pose is invalid", () => {
    const canEnter = evaluateCanEnterCoaching({
      practiceStarted: true,
      cameraState: "CAMERA_READY",
      hasPose: true,
      landmarks: create33Landmarks(0.9),
      evaluation: createMockEvaluation(false), // invalid evaluation
    });

    assert.equal(canEnter, false, "Invalid pose evaluation must block coaching entry");
  });

  // Test 6: CoachingEventEngine allows pose_correction once in coaching state with full body
  it("Test 6: CoachingEventEngine generates pose_correction when in coaching with FULL_BODY_DETECTED", () => {
    const engine = new CoachingEventEngine();
    const badEvaluation: PoseEvaluationResult = {
      ...createMockEvaluation(true),
      score: 55,
      primaryIssue: {
        ruleId: "hip_alignment",
        ruleName: "Hip Alignment",
        severity: "high",
        metric: "angle",
        currentValue: 45,
        targetValue: 90,
        feedback: "Level your hips.",
        joint: "hips",
        isSafety: false,
      },
    };

    const events = engine.process(
      "mountain-pose",
      "Mountain Pose",
      "coaching",
      "FULL_BODY_DETECTED",
      badEvaluation
    );

    const correction = events.find((e) => e.type === "pose_correction");
    assert.ok(correction, "Expected pose_correction event in active coaching");
    assert.equal(correction.ruleId, "hip_alignment");
  });
});
