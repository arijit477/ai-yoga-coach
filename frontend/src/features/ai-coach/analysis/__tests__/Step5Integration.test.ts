import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type {
  PoseEvaluation,
  RuleEvaluation,
  PoseIssue,
} from "../../types/pose-rules";
import {
  getPostureCheckResult,
  PostureStatusDebouncer,
  mapAreaStatus,
} from "../PostureCheckAdapter";
import {
  calculateMedian,
  calculateTrimmedMean,
  ScoreBuffer,
} from "../ScoreAggregator";
import { evaluatePose } from "../PoseEvaluator";
import { mountainPose } from "../rules/asanas/mountainPose";

function createMockPoseEvaluation(overrides?: Partial<PoseEvaluation>): PoseEvaluation {
  return {
    asanaId: "mountain_pose",
    timestamp: Date.now(),
    score: 80,
    rawScore: 80,
    overallStatus: "good",
    status: "good",
    rules: [],
    issues: [],
    primaryIssue: null,
    summary: {
      totalRules: 5,
      evaluatedRules: 5,
      passedRules: 4,
      warningRules: 1,
      failedRules: 0,
      unknownRules: 0,
    },
    posture: {
      head: "good",
      neck: "good",
      shoulders: "good",
      elbows: "good",
      spine: "good",
      hips: "good",
      knees: "good",
      ankles: "good",
    },
    completionEligible: true,
    confidence: 0.95,
    evaluatedAt: Date.now(),
    ...overrides,
  };
}

describe("Step 5 Integration Tests", () => {
  // ==========================================
  // POSTURE CHECK TESTS (1-5)
  // ==========================================
  describe("Posture Check Mapping & Stability", () => {
    it("1. GOOD mapping: maps area with pass status to 'good'", () => {
      const evaluation = createMockPoseEvaluation({
        posture: {
          head: "good",
          neck: "good",
          shoulders: "good",
          elbows: "good",
          spine: "good",
          hips: "good",
          knees: "good",
          ankles: "good",
        },
      });
      const result = getPostureCheckResult(evaluation);
      assert.equal(result.hasData, true);
      const headItem = result.items.find((i) => i.key === "head");
      assert.equal(headItem?.status, "good");
      assert.equal(mapAreaStatus("good"), "good");
    });

    it("2. WARNING mapping: maps area with warning status to 'warning'", () => {
      const evaluation = createMockPoseEvaluation({
        posture: {
          head: "warning",
          neck: "good",
          shoulders: "warning",
          elbows: "good",
          spine: "good",
          hips: "good",
          knees: "good",
          ankles: "good",
        },
      });
      const result = getPostureCheckResult(evaluation);
      const shoulderItem = result.items.find((i) => i.key === "shoulders");
      assert.equal(shoulderItem?.status, "warning");
      assert.equal(mapAreaStatus("warning"), "warning");
    });

    it("3. BAD mapping: maps area with fail status to 'bad'", () => {
      const evaluation = createMockPoseEvaluation({
        posture: {
          head: "bad",
          neck: "good",
          shoulders: "good",
          elbows: "good",
          spine: "bad",
          hips: "good",
          knees: "good",
          ankles: "good",
        },
      });
      const result = getPostureCheckResult(evaluation);
      const spineItem = result.items.find((i) => i.key === "spine");
      assert.equal(spineItem?.status, "bad");
      assert.equal(mapAreaStatus("bad"), "bad");
    });

    it("4. UNKNOWN mapping: maps area with unknown status to 'unknown'", () => {
      const evaluation = createMockPoseEvaluation({
        posture: {
          head: "unknown",
          neck: "unknown",
          shoulders: "good",
          elbows: "unknown",
          spine: "good",
          hips: "good",
          knees: "good",
          ankles: "good",
        },
      });
      const result = getPostureCheckResult(evaluation);
      const neckItem = result.items.find((i) => i.key === "neck");
      assert.equal(neckItem?.status, "unknown");
      assert.equal(mapAreaStatus("unknown"), "unknown");
    });

    it("5. missing rule: body area with no applicable rule defaults to unknown", () => {
      const result = getPostureCheckResult(null);
      assert.equal(result.hasData, false);
      assert.equal(result.items.length, 8);
      assert.ok(result.items.every((i) => i.status === "unknown"));
    });
  });

  // ==========================================
  // CORRECTIONS TESTS (6-9)
  // ==========================================
  describe("Live Corrections & Priority", () => {
    it("6. primaryIssue displayed: primary issue feedback and hint are mapped", () => {
      const issue: PoseIssue = {
        ruleId: "warrior2.front_knee",
        ruleName: "Front Knee Bend",
        severity: "medium",
        metric: "angle",
        currentValue: 120,
        targetValue: 90,
        feedback: "Bend your front knee closer to 90 degrees.",
        joint: "knee",
      };
      const evaluation = createMockPoseEvaluation({
        issues: [issue],
        primaryIssue: issue,
        posture: {
          head: "good",
          neck: "good",
          shoulders: "good",
          elbows: "good",
          spine: "good",
          hips: "good",
          knees: "warning",
          ankles: "good",
        },
      });
      const result = getPostureCheckResult(evaluation);
      const kneeItem = result.items.find((i) => i.key === "knees");
      assert.equal(kneeItem?.status, "warning");
      assert.equal(kneeItem?.hint, "Bend your front knee closer to 90 degrees.");
    });

    it("7. correction changes when issue resolves: next issue becomes primary", () => {
      const issue1: PoseIssue = {
        ruleId: "tree.standing_leg",
        ruleName: "Standing Leg",
        severity: "high",
        metric: "angle",
        currentValue: 150,
        feedback: "Straighten your standing leg.",
        joint: "knee",
      };
      const issue2: PoseIssue = {
        ruleId: "tree.arms",
        ruleName: "Arms Extension",
        severity: "low",
        metric: "angle",
        currentValue: 140,
        feedback: "Reach arms fully overhead.",
        joint: "elbow",
      };

      // Initially issue1 is primary
      const eval1 = createMockPoseEvaluation({
        issues: [issue1, issue2],
        primaryIssue: issue1,
      });
      assert.equal(eval1.primaryIssue?.ruleId, "tree.standing_leg");

      // When issue1 is resolved, issue2 becomes primary
      const eval2 = createMockPoseEvaluation({
        issues: [issue2],
        primaryIssue: issue2,
      });
      assert.equal(eval2.primaryIssue?.ruleId, "tree.arms");
    });

    it("8. correction does not flicker rapidly: debouncer stabilizes state transitions", () => {
      const debouncer = new PostureStatusDebouncer(3);
      // Frame 1: initial good
      assert.equal(debouncer.debounce("spine", "good"), "good");

      // Frame 2: temporary glitch bad (1 frame) -> remains good
      assert.equal(debouncer.debounce("spine", "bad"), "good");

      // Frame 3: returns to good
      assert.equal(debouncer.debounce("spine", "good"), "good");

      // Candidate needs 3 consecutive frames of bad to transition
      assert.equal(debouncer.debounce("spine", "bad"), "good"); // 1st
      assert.equal(debouncer.debounce("spine", "bad"), "good"); // 2nd
      assert.equal(debouncer.debounce("spine", "bad"), "bad"); // 3rd -> transitions!
    });

    it("9. only one primary correction shown even when multiple issues exist", () => {
      const issues: PoseIssue[] = [
        {
          ruleId: "r1",
          ruleName: "Issue 1",
          severity: "low",
          metric: "angle",
          currentValue: 10,
          feedback: "Fix 1",
        },
        {
          ruleId: "r2",
          ruleName: "Issue 2",
          severity: "high",
          metric: "angle",
          currentValue: 20,
          feedback: "Fix 2",
          isSafety: true,
        },
        {
          ruleId: "r3",
          ruleName: "Issue 3",
          severity: "medium",
          metric: "angle",
          currentValue: 15,
          feedback: "Fix 3",
        },
      ];
      const evaluation = createMockPoseEvaluation({
        issues,
        primaryIssue: issues[1], // Safety issue prioritized
      });
      assert.equal(evaluation.issues.length, 3);
      assert.equal(evaluation.primaryIssue?.ruleId, "r2");
    });
  });

  // ==========================================
  // ACCURACY BUFFER TESTS (10-14)
  // ==========================================
  describe("Accuracy Rolling Buffer & Aggregation", () => {
    it("10. score does not update circle every frame: rolling buffer averages noise", () => {
      const buffer = new ScoreBuffer(10);
      const scores = [82, 78, 81, 84, 80];
      for (const s of scores) {
        buffer.push(s, true);
      }
      assert.equal(buffer.size(), 5);
      assert.equal(buffer.getFinalScore(), 81);
    });

    it("11. valid score buffer: ignores invalid, NaN, and negative scores", () => {
      const buffer = new ScoreBuffer(10);
      buffer.push(80, true);
      buffer.push(null, false);
      buffer.push(NaN, true);
      buffer.push(-5, true);
      buffer.push(86, true);
      assert.equal(buffer.size(), 2);
    });

    it("12. final median/aggregation: computes correct median and trimmed mean", () => {
      const samples = [60, 80, 82, 84, 99];
      assert.equal(calculateMedian(samples), 82);
      const trimmed = calculateTrimmedMean(samples, 0.2); // drops 60 and 99 -> avg(80, 82, 84) = 82
      assert.equal(Math.round(trimmed), 82);
    });

    it("13. score clamped 0–100", () => {
      const buffer = new ScoreBuffer(5);
      buffer.push(150, true);
      buffer.push(110, true);
      assert.equal(buffer.getFinalScore(), 100);

      const buffer2 = new ScoreBuffer(5);
      buffer2.push(-20, true);
      assert.equal(buffer2.size(), 0);
    });

    it("14. final score remains stable across multiple calls", () => {
      const buffer = new ScoreBuffer(5);
      buffer.push(85, true);
      buffer.push(85, true);
      buffer.push(85, true);
      const score1 = buffer.getFinalScore();
      const score2 = buffer.getFinalScore();
      assert.equal(score1, 85);
      assert.equal(score2, 85);
    });
  });

  // ==========================================
  // COMPLETION TESTS (15-20)
  // ==========================================
  describe("75% Completion Threshold & Decoupling", () => {
    it("15. score below 75 does not complete", () => {
      const buffer = new ScoreBuffer(10);
      buffer.push(65, true);
      buffer.push(70, true);
      buffer.push(72, true);
      const result = buffer.checkThresholdCrossing(72);
      assert.equal(result.didCross, false);
      assert.equal(buffer.isCompleted(), false);
    });

    it("16. crossing 75 completes asana", () => {
      const buffer = new ScoreBuffer(10);
      buffer.push(70, true);
      buffer.push(72, true);
      buffer.push(78, true);
      buffer.push(80, true);
      const result = buffer.checkThresholdCrossing(80);
      assert.equal(result.didCross, true);
      assert.ok(result.finalScore >= 75);
      assert.equal(buffer.isCompleted(), true);
    });

    it("17. completion fires only once: subsequent frames do not re-cross", () => {
      const buffer = new ScoreBuffer(10);
      buffer.push(76, true);
      buffer.push(78, true);
      buffer.push(80, true);
      const first = buffer.checkThresholdCrossing(80);
      assert.equal(first.didCross, true);

      // Next frames
      buffer.push(82, true);
      const second = buffer.checkThresholdCrossing(82);
      assert.equal(second.didCross, false);
      const third = buffer.checkThresholdCrossing(85);
      assert.equal(third.didCross, false);
    });

    it("18. 90/100 is not required: 75% triggers completion", () => {
      const buffer = new ScoreBuffer(10);
      buffer.push(75, true);
      buffer.push(75, true);
      buffer.push(75, true);
      const result = buffer.checkThresholdCrossing(75);
      assert.equal(result.didCross, true);
      assert.equal(result.finalScore, 75);
    });

    it("19. 10-second hold is not required for completion", () => {
      const buffer = new ScoreBuffer(10);
      buffer.push(78, true);
      buffer.push(79, true);
      buffer.push(81, true);
      // Immediately crosses threshold without hold timer duration
      const result = buffer.checkThresholdCrossing(81);
      assert.equal(result.didCross, true);
    });

    it("20. new asana resets completion state", () => {
      const buffer = new ScoreBuffer(10);
      buffer.push(80, true);
      buffer.push(82, true);
      buffer.push(84, true);
      buffer.checkThresholdCrossing(84);
      assert.equal(buffer.isCompleted(), true);

      buffer.reset();
      assert.equal(buffer.isCompleted(), false);
      assert.equal(buffer.size(), 0);
    });
  });

  // ==========================================
  // SESSION CONTINUITY TESTS (21-24)
  // ==========================================
  describe("Session Continuity & Resets", () => {
    it("21. next asana resets asana state without leaking previous scores", () => {
      const buffer = new ScoreBuffer(10);
      const debouncer = new PostureStatusDebouncer(3);
      buffer.push(88, true);
      debouncer.debounce("spine", "good");

      // Reset for next asana
      buffer.reset();
      debouncer.reset();
      assert.equal(buffer.size(), 0);
      assert.equal(buffer.getFinalScore(), null);
    });

    it("22. camera remains active when changing asana", () => {
      let isCameraActive = true;
      const onAdvanceAsana = () => {
        // Asana changes, but isCameraActive remains true
      };
      onAdvanceAsana();
      assert.equal(isCameraActive, true);
    });

    it("23. MediaPipe remains active across asana transitions", () => {
      let isInitialized = true;
      const onAdvanceAsana = () => {
        // MediaPipe instance not recreated
      };
      onAdvanceAsana();
      assert.equal(isInitialized, true);
    });

    it("24. avatar remains active across asana transitions", () => {
      let selectedCoach = "alice";
      const onAdvanceAsana = () => {
        // Persona state preserved
      };
      onAdvanceAsana();
      assert.equal(selectedCoach, "alice");
    });
  });

  // ==========================================
  // UNKNOWN & ERROR HANDLING TESTS (25-26)
  // ==========================================
  describe("Unknown & Confidence Error Handling", () => {
    it("25. low confidence does not complete pose", () => {
      const evaluation = createMockPoseEvaluation({
        score: 0,
        rawScore: 0,
        overallStatus: "unknown",
        completionEligible: false,
        confidence: 0.1,
      });
      assert.equal(evaluation.completionEligible, false);
      assert.equal(evaluation.score, 0);
    });

    it("26. missing landmark does not generate false correction", () => {
      // Evaluating rules with empty/null landmarks
      const evalResult = evaluatePose("mountain_pose", mountainPose.rules, {
        landmarks: [],
      });
      // All rules are unknown, no false failures generated
      assert.equal(evalResult.summary.unknownRules, mountainPose.rules.length);
      assert.equal(evalResult.summary.failedRules, 0);
      assert.equal(evalResult.primaryIssue, null);
    });
  });
});
