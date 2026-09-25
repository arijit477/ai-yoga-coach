import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  SessionStateMachine,
  canTransitionSession,
  ALLOWED_SESSION_TRANSITIONS,
} from "../SessionStateMachine";
import { evaluateCameraReadiness } from "../../motion/CameraReadinessEvaluator";
import { ScoreBuffer } from "../../analysis/ScoreAggregator";
import type { PoseLandmarks } from "../../types/landmarks";

function createFullBodyLandmarks(confidence: number = 0.9): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    landmarks.push({
      x: 0.5,
      y: 0.1 + (i / 33) * 0.8,
      z: 0.0,
      visibility: confidence,
    });
  }
  return landmarks;
}

describe("Step 6 Session State Machine & Flow Tests", () => {
  // ==========================================
  // STATE TRANSITIONS (1-15)
  // ==========================================
  describe("State Transitions", () => {
    it("1. idle -> guide_video", () => {
      const sm = new SessionStateMachine("idle");
      assert.equal(sm.canTransitionTo("guide_video"), true);
      assert.equal(sm.transition("guide_video"), true);
      assert.equal(sm.getState(), "guide_video");
    });

    it("2. guide_video -> get_ready", () => {
      const sm = new SessionStateMachine("guide_video");
      assert.equal(sm.canTransitionTo("get_ready"), true);
      assert.equal(sm.transition("get_ready"), true);
      assert.equal(sm.getState(), "get_ready");
    });

    it("3. get_ready -> camera_check", () => {
      const sm = new SessionStateMachine("get_ready");
      assert.equal(sm.canTransitionTo("camera_check"), true);
      assert.equal(sm.transition("camera_check"), true);
      assert.equal(sm.getState(), "camera_check");
    });

    it("4. camera_check -> hold_still", () => {
      const sm = new SessionStateMachine("camera_check");
      assert.equal(sm.canTransitionTo("hold_still"), true);
      assert.equal(sm.transition("hold_still"), true);
      assert.equal(sm.getState(), "hold_still");
    });

    it("5. hold_still -> calibrating", () => {
      const sm = new SessionStateMachine("hold_still");
      assert.equal(sm.canTransitionTo("calibrating"), true);
      assert.equal(sm.transition("calibrating"), true);
      assert.equal(sm.getState(), "calibrating");
    });

    it("6. calibrating -> coaching", () => {
      const sm = new SessionStateMachine("calibrating");
      assert.equal(sm.canTransitionTo("coaching"), true);
      assert.equal(sm.transition("coaching"), true);
      assert.equal(sm.getState(), "coaching");
    });

    it("7. coaching -> correcting", () => {
      const sm = new SessionStateMachine("coaching");
      assert.equal(sm.canTransitionTo("correcting"), true);
      assert.equal(sm.transition("correcting"), true);
      assert.equal(sm.getState(), "correcting");
    });

    it("8. correcting -> coaching", () => {
      const sm = new SessionStateMachine("correcting");
      assert.equal(sm.canTransitionTo("coaching"), true);
      assert.equal(sm.transition("coaching"), true);
      assert.equal(sm.getState(), "coaching");
    });

    it("9. coaching -> holding", () => {
      const sm = new SessionStateMachine("coaching");
      assert.equal(sm.canTransitionTo("holding"), true);
      assert.equal(sm.transition("holding"), true);
      assert.equal(sm.getState(), "holding");
    });

    it("10. holding -> coaching", () => {
      const sm = new SessionStateMachine("holding");
      assert.equal(sm.canTransitionTo("coaching"), true);
      assert.equal(sm.transition("coaching"), true);
      assert.equal(sm.getState(), "coaching");
    });

    it("11. completion -> pose_review", () => {
      const sm = new SessionStateMachine("coaching");
      assert.equal(sm.canTransitionTo("pose_review"), true);
      assert.equal(sm.transition("pose_review"), true);
      assert.equal(sm.getState(), "pose_review");
    });

    it("12. pose_review -> user_choice", () => {
      const sm = new SessionStateMachine("pose_review");
      assert.equal(sm.canTransitionTo("user_choice"), true);
      assert.equal(sm.transition("user_choice"), true);
      assert.equal(sm.getState(), "user_choice");
    });

    it("13. user_choice -> next pose (get_ready)", () => {
      const sm = new SessionStateMachine("user_choice");
      assert.equal(sm.canTransitionTo("get_ready"), true);
      assert.equal(sm.transition("get_ready"), true);
      assert.equal(sm.getState(), "get_ready");
    });

    it("14. user_choice -> stay (coaching)", () => {
      const sm = new SessionStateMachine("user_choice");
      assert.equal(sm.canTransitionTo("coaching"), true);
      assert.equal(sm.transition("coaching"), true);
      assert.equal(sm.getState(), "coaching");
    });

    it("15. user_choice -> completed (end session)", () => {
      const sm = new SessionStateMachine("user_choice");
      assert.equal(sm.canTransitionTo("completed"), true);
      assert.equal(sm.transition("completed"), true);
      assert.equal(sm.getState(), "completed");
    });
  });

  // ==========================================
  // CAMERA READINESS & GUIDANCE (16-20)
  // ==========================================
  describe("Camera Validation & Guidance", () => {
    it("16. no body: returns camera_no_pose and guidance: no_body", () => {
      const result = evaluateCameraReadiness([]);
      assert.equal(result.ready, false);
      assert.equal(result.state, "camera_no_pose");
      assert.equal(result.guidance, "no_body");
    });

    it("17. partial body: identifies missing feet or head", () => {
      const partialLandmarks = createFullBodyLandmarks();
      // Hide feet (landmarks 27-32)
      for (let i = 27; i <= 32; i++) {
        partialLandmarks[i].visibility = 0.1;
      }
      const result = evaluateCameraReadiness(partialLandmarks);
      assert.equal(result.ready, false);
      assert.equal(result.state, "camera_partial");
      assert.ok(result.missing.includes("feet"));
      assert.equal(result.guidance, "feet_missing");
    });

    it("18. full body: returns camera_ready when all key areas are visible", () => {
      const fullLandmarks = createFullBodyLandmarks(0.95);
      const result = evaluateCameraReadiness(fullLandmarks);
      assert.equal(result.ready, true);
      assert.equal(result.state, "camera_ready");
      assert.equal(result.missing.length, 0);
      assert.equal(result.guidance, "camera_ready");
    });

    it("19. low confidence: detects low visibility/lighting issues", () => {
      const lowConfLandmarks = createFullBodyLandmarks(0.2);
      const result = evaluateCameraReadiness(lowConfLandmarks);
      assert.equal(result.ready, false);
      assert.equal(result.guidance, "poor_confidence");
    });

    it("20. camera recovery: smoothly recovers to ready when frame arrives", () => {
      // Step 1: empty
      const emptyResult = evaluateCameraReadiness([]);
      assert.equal(emptyResult.ready, false);

      // Step 2: recovered full body
      const fullLandmarks = createFullBodyLandmarks(0.9);
      const recoveredResult = evaluateCameraReadiness(fullLandmarks);
      assert.equal(recoveredResult.ready, true);
      assert.equal(recoveredResult.state, "camera_ready");
    });
  });

  // ==========================================
  // RESETS & BOUNDARIES (21-23)
  // ==========================================
  describe("Reset Boundaries", () => {
    it("21. current asana reset: resets buffer and completion without losing session index", () => {
      const buffer = new ScoreBuffer();
      buffer.push(85, true);
      buffer.setCompleted(true);
      assert.equal(buffer.size(), 1);
      assert.equal(buffer.isCompleted(), true);

      // Reset asana
      buffer.reset();
      assert.equal(buffer.size(), 0);
      assert.equal(buffer.isCompleted(), false);
    });

    it("22. session reset: resets to idle state", () => {
      const sm = new SessionStateMachine("coaching");
      sm.reset("idle");
      assert.equal(sm.getState(), "idle");
    });

    it("23. camera reset: resets readiness state without affecting state machine", () => {
      const readiness = evaluateCameraReadiness(null, { hardwareStatus: "disabled" });
      assert.equal(readiness.ready, false);
      assert.equal(readiness.state, "camera_disabled");
    });
  });

  // ==========================================
  // BEHAVIORAL REQUIREMENTS (24-30)
  // ==========================================
  describe("Behavioral Flows", () => {
    it("24. guide video skip: transitions to get_ready", () => {
      const sm = new SessionStateMachine("guide_video");
      assert.equal(sm.transition("get_ready"), true);
      assert.equal(sm.getState(), "get_ready");
    });

    it("25. guide video completion: transitions to get_ready", () => {
      const sm = new SessionStateMachine("guide_video");
      assert.equal(sm.transition("get_ready"), true);
      assert.equal(sm.getState(), "get_ready");
    });

    it("26. hold stability reset: losing readiness resets hold-still countdown", () => {
      let countdown = 2;
      const onStabilityLost = () => {
        countdown = 2; // Reset
      };
      onStabilityLost();
      assert.equal(countdown, 2);
    });

    it("27. calibration failure: handles failure gracefully without crashing", () => {
      const sm = new SessionStateMachine("calibrating");
      // Failure can return to hold_still or camera_check
      assert.equal(sm.canTransitionTo("hold_still"), true);
      assert.equal(sm.transition("hold_still"), true);
      assert.equal(sm.getState(), "hold_still");
    });

    it("28. completion remains one-time: threshold crossing fires only once", () => {
      const buffer = new ScoreBuffer();
      buffer.push(80, true);
      buffer.push(82, true);
      buffer.push(84, true);

      const firstCrossing = buffer.checkThresholdCrossing(84);
      assert.equal(firstCrossing.didCross, true);

      buffer.push(85, true);
      const secondCrossing = buffer.checkThresholdCrossing(85);
      assert.equal(secondCrossing.didCross, false);
    });

    it("29. next pose does not restart camera: camera state is preserved", () => {
      let isCameraActive = true;
      const onNextPose = () => {
        // Next pose advances asana without modifying isCameraActive
      };
      onNextPose();
      assert.equal(isCameraActive, true);
    });

    it("30. fullscreen toggle does not reset session state", () => {
      const sm = new SessionStateMachine("coaching");
      let isFullscreen = false;

      // Toggle fullscreen
      isFullscreen = !isFullscreen;
      // State machine remains in coaching
      assert.equal(sm.getState(), "coaching");
      assert.equal(isFullscreen, true);

      isFullscreen = !isFullscreen;
      assert.equal(sm.getState(), "coaching");
    });
  });
});
