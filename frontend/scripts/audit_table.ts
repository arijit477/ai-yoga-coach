
import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog.ts";
import { categorizeAsana } from "./generateCoverageReport.ts";
import { CORE_COACHING_PROFILES } from "../src/features/ai-coach/data/coachingProfilesCatalog.ts";
import * as fs from "node:fs";

interface AuditEntry {
  index: number;
  id: string;
  name: string;
  sanskritName: string;
  category: string;
  difficulty: string;
  targetHoldSeconds: number;
  ruleCount: number;
  ruleNames: string[];
  criticalRequirements: string;
  coverage: string;
  status: "A — STRONG" | "B — NEEDS IMPROVEMENT" | "C — WEAK" | "D — MISSING" | "E — SPECIAL CASE";
  priority: "P0 — CRITICAL" | "P1 — HIGH" | "P2 — MEDIUM" | "P3 — LOW";
  rationale: string;
}

const auditList: AuditEntry[] = [];

// Special manual hand-crafted rules that exist in the codebase:
const HAND_CRAFTED_STRONG = [
  "warrior-ii", "tree-pose", "mountain-pose", "downward-dog", "bhujangasana", 
  "chaturanga-dandasana", "balasana", "setu-bandhasana", "padmasana"
];

ALL_ASANAS_CATALOG.forEach((asana, idx) => {
  const id = (asana.id || asana.slug || "").toLowerCase();
  const name = asana.displayName || asana.name || "";
  const sanskrit = asana.sanskritName || "";
  const category = asana.category || "standing";
  const difficulty = asana.difficulty || "beginner";
  const targetHold = asana.targetHoldSeconds || 5;

  const cov = categorizeAsana(asana);
  const profile = CORE_COACHING_PROFILES[id] || CORE_COACHING_PROFILES[asana.slug || ""];
  const rules = (asana.rules && asana.rules.length > 0) ? asana.rules : (profile?.poseRules || []);
  const ruleCount = rules.length;
  const ruleNames = rules.map((r: any) => r.name || r.id);

  let status: AuditEntry["status"] = "C — WEAK";
  let priority: AuditEntry["priority"] = "P1 — HIGH";
  let coverage = "Low / Generic";
  let criticalReqs = "";
  let rationale = "";

  if (cov.supportLevel === "requires_manual_rule_definition") {
    status = "E — SPECIAL CASE";
    priority = "P0 — CRITICAL";
    coverage = "Not Evaluated (Camera Occlusion / 3D Depth)";
    criticalReqs = "Complex limb bindings, suspended balance, or extreme multi-joint self-occlusion";
    rationale = cov.rationale || "Extreme body compaction or multi-plane inversion exceeds standard single 2D camera view";
  } else if (HAND_CRAFTED_STRONG.includes(id)) {
    status = "A — STRONG";
    priority = "P3 — LOW";
    coverage = "High (Pose-Specific Rules)";
    criticalReqs = ruleNames.join(", ");
    rationale = "Dedicated biomechanical angle and alignment rules accurately distinguish this stance.";
  } else if (cov.supportLevel === "partially_supported") {
    status = "B — NEEDS IMPROVEMENT";
    priority = "P1 — HIGH";
    coverage = "Medium (Partial Stance Metrics)";
    criticalReqs = ruleNames.slice(0, 3).join(", ") || "Torso / Hip / Limb orientation";
    rationale = cov.rationale || "Core alignment evaluated, but rotational depth or specific extremity positioning needs refined rules.";
  } else if (ruleCount === 0) {
    status = "D — MISSING";
    priority = "P0 — CRITICAL";
    coverage = "None (0 Rules)";
    criticalReqs = "Pose-specific joint angles and limb alignment";
    rationale = "No detection rules registered in catalog.";
  } else {
    // Generated generic coaching profile rules (e.g. 2-3 standard stance rules)
    status = "C — WEAK";
    priority = "P0 — CRITICAL";
    coverage = "Low (Generic Stance Profile Only)";
    criticalReqs = "Generic " + cov.startingPosition + " alignment (" + ruleNames.slice(0, 2).join(", ") + ")";
    rationale = "Relies on generic baseline stance template without unique limb articulation angles distinguishing this specific pose.";
  }

  auditList.push({
    index: idx + 1,
    id,
    name,
    sanskritName: sanskrit,
    category,
    difficulty,
    targetHoldSeconds: targetHold,
    ruleCount,
    ruleNames,
    criticalRequirements: criticalReqs,
    coverage,
    status,
    priority,
    rationale
  });
});

fs.writeFileSync("scripts/audit_results.json", JSON.stringify(auditList, null, 2));
console.log("Audited " + auditList.length + " asanas successfully.");

const counts = {
  strong: auditList.filter(a => a.status === "A — STRONG").length,
  needsImprovement: auditList.filter(a => a.status === "B — NEEDS IMPROVEMENT").length,
  weak: auditList.filter(a => a.status === "C — WEAK").length,
  missing: auditList.filter(a => a.status === "D — MISSING").length,
  specialCase: auditList.filter(a => a.status === "E — SPECIAL CASE").length,
};

console.log("Counts:", JSON.stringify(counts, null, 2));
