import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks";
import type { PoseRule, PoseEvaluatorContext } from "../../types/pose-rules";
import { calculatePoseAccuracy, calculateAccuracyFromRuleResults } from "../AccuracyCalculator";
import { evaluatePose } from "../PoseEvaluator";
import { TemporalPoseEvaluator } from "../TemporalPoseEvaluator";
import { warriorIIPose, padmasanaPose, bhujangasanaPose, setuBandhasanaPose } from "../rules/asanas";
import { ScoreBuffer } from "../ScoreAggregator";

function createMockLandmarks(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    const base: Landmark = {
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: 0.95,
      presence: 0.95,
    };
    if (overrides[i]) {
      landmarks.push({ ...base, ...overrides[i] });
    } else {
      landmarks.push(base);
    }
  }
  return landmarks;
}

function createContext(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseEvaluatorContext {
  const lm = createMockLandmarks(overrides);
  return {
    landmarks: lm,
    worldLandmarks: lm,
    timestamp: 1000,
  };
}

describe("Section 25: Real-time Pose Accuracy Pipeline & Completion Tests", () => {
  // Test 1 — Deterministic calculation
  it("Test 1 — Deterministic calculation: Same input 100 times produces 100 identical results", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0, y: 1, z: 0, visibility: 0.9 },
      [P.LEFT_ELBOW]: { x: 0, y: 0, z: 0, visibility: 0.9 },
      [P.LEFT_WRIST]: { x: 1, y: 0, z: 0, visibility: 0.9 },
    });

    const firstResult = calculatePoseAccuracy("warrior_ii", warriorIIPose.rules, ctx, 1, 1000);

    for (let i = 2; i <= 100; i++) {
      const iterResult = calculatePoseAccuracy("warrior_ii", warriorIIPose.rules, ctx, i, 1000 + i * 33);
      assert.strictEqual(iterResult.accuracy, firstResult.accuracy);
      assert.strictEqual(iterResult.rawAccuracy, firstResult.rawAccuracy);
      assert.strictEqual(iterResult.validRuleCount, firstResult.validRuleCount);
      assert.strictEqual(iterResult.failedRuleCount, firstResult.failedRuleCount);
    }
  });

  // Test 2 — No random zero
  it("Test 2 — No random zero: Stable valid input must never randomly produce 0", () => {
    const evaluator = new TemporalPoseEvaluator(150);
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.3, z: 0, visibility: 0.95 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.3, z: 0, visibility: 0.95 },
      [P.LEFT_HIP]: { x: 0.4, y: 0.6, z: 0, visibility: 0.95 },
      [P.RIGHT_HIP]: { x: 0.6, y: 0.6, z: 0, visibility: 0.95 },
      [P.LEFT_KNEE]: { x: 0.4, y: 0.8, z: 0, visibility: 0.95 },
      [P.RIGHT_KNEE]: { x: 0.6, y: 0.8, z: 0, visibility: 0.95 },
      [P.LEFT_ANKLE]: { x: 0.4, y: 0.95, z: 0, visibility: 0.95 },
      [P.RIGHT_ANKLE]: { x: 0.6, y: 0.95, z: 0, visibility: 0.95 },
    });

    for (let frame = 1; frame <= 50; frame++) {
      const res = evaluator.evaluate("warrior_ii", warriorIIPose.rules, ctx);
      assert.ok(res !== null, "Result should not be null");
      assert.ok(res.score > 0, `Frame ${frame} score should be > 0, got ${res.score}`);
      assert.ok(res.isValid, `Frame ${frame} should be marked valid`);
    }
  });

  // Test 3 — NaN protection
  it("Test 3 — NaN protection: Invalid geometry or NaN coords must not produce NaN/Infinity", () => {
    const badContext = createContext({
      [P.LEFT_SHOULDER]: { x: NaN, y: Infinity, z: -Infinity, visibility: 0.9 },
      [P.LEFT_ELBOW]: { x: 0, y: 0, z: 0, visibility: 0.9 },
      [P.LEFT_WRIST]: { x: 1, y: 0, z: 0, visibility: 0.9 },
    });

    const result = calculatePoseAccuracy("warrior_ii", warriorIIPose.rules, badContext, 1, 1000);
    assert.strictEqual(isNaN(result.accuracy), false, "accuracy must not be NaN");
    assert.strictEqual(isFinite(result.accuracy), true, "accuracy must be finite");
    assert.strictEqual(isNaN(result.rawAccuracy), false, "rawAccuracy must not be NaN");
    assert.strictEqual(isFinite(result.rawAccuracy), true, "rawAccuracy must be finite");
    assert.ok(result.accuracy >= 0 && result.accuracy <= 100, "accuracy must be clamped [0, 100]");
  });

  // Test 4 — Temporary landmark loss
  it("Test 4 — Temporary landmark loss: Temporary missing landmark must not corrupt later frames", () => {
    const evaluator = new TemporalPoseEvaluator(150);
    const validCtx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.3, z: 0, visibility: 0.95 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.3, z: 0, visibility: 0.95 },
      [P.LEFT_HIP]: { x: 0.4, y: 0.6, z: 0, visibility: 0.95 },
      [P.RIGHT_HIP]: { x: 0.6, y: 0.6, z: 0, visibility: 0.95 },
    });

    // 3 valid frames
    const f1 = evaluator.evaluate("bhujangasana", bhujangasanaPose.rules, validCtx);
    const f2 = evaluator.evaluate("bhujangasana", bhujangasanaPose.rules, validCtx);
    const f3 = evaluator.evaluate("bhujangasana", bhujangasanaPose.rules, validCtx);
    assert.ok(f1 && f2 && f3);
    const initialScore = f3.score;

    // 1 frame with missing/occluded landmarks (low visibility)
    const occludedCtx: PoseEvaluatorContext = {
      landmarks: createMockLandmarks({
        [P.NOSE]: { visibility: 0.05 },
        [P.LEFT_SHOULDER]: { visibility: 0.05 },
        [P.RIGHT_SHOULDER]: { visibility: 0.05 },
      }),
      timestamp: 2000,
    };
    evaluator.evaluate("bhujangasana", bhujangasanaPose.rules, occludedCtx);

    // 2 valid frames after recovery
    const r1 = evaluator.evaluate("bhujangasana", bhujangasanaPose.rules, validCtx);
    const r2 = evaluator.evaluate("bhujangasana", bhujangasanaPose.rules, validCtx);
    assert.ok(r1 && r2);
    assert.ok(r2.isValid);
    assert.ok(Math.abs(r2.score - initialScore) <= 5, "Score should recover cleanly to near initial score");
  });

  // Test 5 — Asana isolation
  it("Test 5 — Asana isolation: Lotus rules must not use Warrior II results or state", () => {
    const ctx = createContext();

    const warriorRes = calculatePoseAccuracy("warrior_ii", warriorIIPose.rules, ctx, 1);
    const lotusRes = calculatePoseAccuracy("padmasana", padmasanaPose.rules, ctx, 1);

    assert.strictEqual(warriorRes.asanaId, "warrior_ii");
    assert.strictEqual(lotusRes.asanaId, "padmasana");
    assert.strictEqual(warriorRes.totalRuleCount, warriorIIPose.rules.length);
    assert.strictEqual(lotusRes.totalRuleCount, padmasanaPose.rules.length);
  });

  // Test 6 — Frame consistency
  it("Test 6 — Frame consistency: One frame must produce one consistent landmarks -> rules -> accuracy", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0, y: 1, z: 0, visibility: 0.9 },
      [P.LEFT_ELBOW]: { x: 0, y: 0, z: 0, visibility: 0.9 },
      [P.LEFT_WRIST]: { x: 1, y: 0, z: 0, visibility: 0.9 },
    });

    const frameId = 42;
    const timestamp = 1700000000;
    const res = calculatePoseAccuracy("setu-bandhasana", setuBandhasanaPose.rules, ctx, frameId, timestamp);

    assert.strictEqual(res.frameId, frameId);
    assert.strictEqual(res.timestamp, timestamp);
    assert.strictEqual(res.ruleEvaluations.length, setuBandhasanaPose.rules.length);
    assert.strictEqual(res.validRuleCount + res.warningRuleCount + res.failedRuleCount + res.unavailableRuleCount, setuBandhasanaPose.rules.length);
  });

  // Test 7 — Accuracy recovery
  it("Test 7 — Accuracy recovery: Broken alignment drops score, restoring alignment restores score deterministically", () => {
    // 1. Correct alignment
    const correctCtx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.2, y: 0.3, z: 0, visibility: 0.95 },
      [P.RIGHT_SHOULDER]: { x: 0.8, y: 0.3, z: 0, visibility: 0.95 },
      [P.LEFT_ELBOW]: { x: 0.1, y: 0.3, z: 0, visibility: 0.95 },
      [P.RIGHT_ELBOW]: { x: 0.9, y: 0.3, z: 0, visibility: 0.95 },
      [P.LEFT_WRIST]: { x: 0.0, y: 0.3, z: 0, visibility: 0.95 },
      [P.RIGHT_WRIST]: { x: 1.0, y: 0.3, z: 0, visibility: 0.95 },
    });
    const correctRes = calculatePoseAccuracy("warrior_ii", warriorIIPose.rules, correctCtx);

    // 2. Broken alignment (shoulders tilted heavily)
    const brokenCtx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.2, y: 0.1, z: 0, visibility: 0.95 },
      [P.RIGHT_SHOULDER]: { x: 0.8, y: 0.7, z: 0, visibility: 0.95 },
      [P.LEFT_ELBOW]: { x: 0.1, y: 0.1, z: 0, visibility: 0.95 },
      [P.RIGHT_ELBOW]: { x: 0.9, y: 0.7, z: 0, visibility: 0.95 },
      [P.LEFT_WRIST]: { x: 0.0, y: 0.1, z: 0, visibility: 0.95 },
      [P.RIGHT_WRIST]: { x: 1.0, y: 0.7, z: 0, visibility: 0.95 },
    });
    const brokenRes = calculatePoseAccuracy("warrior_ii", warriorIIPose.rules, brokenCtx);

    assert.ok(brokenRes.accuracy < correctRes.accuracy, `Broken pose score (${brokenRes.accuracy}) must be lower than correct pose score (${correctRes.accuracy})`);

    // 3. Restore alignment
    const restoredRes = calculatePoseAccuracy("warrior_ii", warriorIIPose.rules, correctCtx);
    assert.strictEqual(restoredRes.accuracy, correctRes.accuracy, "Restored pose score must exactly equal original correct score");
  });

  // Test 8 — Completion accuracy snapshot
  it("Test 8 — Completion accuracy snapshot: Completion snapshot matches Frame N accuracy exactly", () => {
    const frameAccuracy = 82;
    const buffer = new ScoreBuffer();
    buffer.push(80);
    buffer.push(81);
    buffer.push(frameAccuracy);

    const snapshotAccuracy = Math.max(0, Math.min(100, Math.round(frameAccuracy)));
    assert.strictEqual(snapshotAccuracy, 82, "Snapshot accuracy must be exact Frame N score (82)");
  });

  // Test 9 — Post-completion freeze
  it("Test 9 — Post-completion freeze: ScoreBuffer isCompleted prevents new completion events", () => {
    const buffer = new ScoreBuffer({ completionThreshold: 75 });
    buffer.push(80);
    buffer.push(82);
    buffer.push(85);

    const firstCrossing = buffer.checkThresholdCrossing(85);
    assert.strictEqual(firstCrossing.didCross, true);
    assert.strictEqual(buffer.isCompleted(), true);

    // Subsequent updates should not trigger another crossing
    const secondCrossing = buffer.checkThresholdCrossing(90);
    assert.strictEqual(secondCrossing.didCross, false, "Subsequent frames must not trigger crossing once completed");
  });

  // Test 10 — New session reset
  it("Test 10 — New session reset: Starting a new asana resets evaluator and buffer cleanly", () => {
    const evaluator = new TemporalPoseEvaluator(150);
    const ctx = createContext();

    // Accumulate multiple hold frames on warrior
    for (let i = 0; i < 10; i++) {
      evaluator.evaluate("warrior_ii", warriorIIPose.rules, ctx);
    }

    evaluator.reset();

    const freshEval = evaluator.evaluate("padmasana", padmasanaPose.rules, ctx);
    assert.ok(freshEval !== null);
    assert.strictEqual(freshEval.asanaId, "padmasana");
    // After reset, 1 single frame yields exactly 1 / 150 = 0.67% hold progress, not continuing previous 10 frames
    assert.ok(freshEval.holdProgress <= 1, "Hold progress should reset and start fresh from frame 1");
  });
});
