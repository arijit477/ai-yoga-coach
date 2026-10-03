# Phase 3 — Coaching Rhythm

## Goal
Make the voice coach feel natural and engaged without changing pose detection, scoring, or the unidirectional voice architecture.

## Rules
- Vision/rule evaluation remains authoritative.
- Never send every MediaPipe frame to Realtime.
- Speak for meaningful correction, correction resolution, safety, encouragement, hold progress, and completion events.
- Respect existing cooldown and prioritization gates.
- Keep spoken guidance short and actionable.
- Do not invent biomechanical corrections that are absent from trusted coaching context.

## Implementation boundary
This phase introduces a rhythm decision layer only. Realtime prompt/persona upgrades should consume its decisions in the next integration step.
