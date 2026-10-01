import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog";
import { KNOWN_CRITICAL_RULES } from "../src/features/ai-coach/analysis/AsanaCompletionGate";
import { resolveCanonicalAsanaId } from "../src/features/ai-coach/analysis/AsanaCanonicalIdResolver";
import fs from "fs";

interface RuleDetail {
  id: string;
  name: string;
  metric: string;
  points: number[];
  target?: number;
  tolerance?: number;
  severity?: string;
  weight?: number;
  isCritical: boolean;
  role: "IDENTITY" | "FORM" | "OPTIONAL_COACHING";
  isGeneric: boolean;
  isPoseDefining: boolean;
}

interface AsanaAudit {
  id: string;
  name: string;
  canonicalId: string;
  category: string;
  primaryStance: string;
  rules: RuleDetail[];
  ruleCount: number;
  criticalRuleCount: number;
  quality: "A" | "B" | "C" | "D";
  potentialConfusions: string[];
  distinguishingFeatures: string[];
  recommendedAction: string;
}

const auditList: AsanaAudit[] = [];
let totalRules = 0;
let totalIdentityRules = 0;
let totalFormRules = 0;
let totalCriticalRules = 0;

for (const asana of ALL_ASANAS_CATALOG) {
  const canonicalId = resolveCanonicalAsanaId(asana.id);
  const criticalRuleIds = new Set(KNOWN_CRITICAL_RULES[canonicalId] || []);

  const ruleDetails: RuleDetail[] = asana.rules.map((r) => {
    const isCrit = criticalRuleIds.has(r.id) || r.severity === "high";
    
    // Classify generic vs pose-defining
    // e.g. generic shoulder/hip alignment vs specific joint angles
    const nameLower = r.name.toLowerCase();
    const idLower = r.id.toLowerCase();
    const isGeneric = 
      nameLower.includes("horizontal shoulders") || 
      nameLower.includes("level hips") || 
      nameLower.includes("level pelvis") ||
      nameLower.includes("neutral gaze");

    const isPoseDefining = !isGeneric && (
      r.metric === "angle" || 
      r.metric === "distance" || 
      r.metric === "alignment"
    );

    let role: "IDENTITY" | "FORM" | "OPTIONAL_COACHING" = "FORM";
    if (isCrit) {
      role = "IDENTITY";
    } else if (r.severity === "low") {
      role = "OPTIONAL_COACHING";
    } else {
      role = "FORM";
    }

    return {
      id: r.id,
      name: r.name,
      metric: r.metric,
      points: r.points,
      target: r.target,
      tolerance: r.tolerance,
      severity: r.severity,
      weight: r.weight,
      isCritical: isCrit,
      role,
      isGeneric,
      isPoseDefining,
    };
  });

  totalRules += ruleDetails.length;
  totalCriticalRules += ruleDetails.filter((r) => r.isCritical).length;
  totalIdentityRules += ruleDetails.filter((r) => r.role === "IDENTITY").length;
  totalFormRules += ruleDetails.filter((r) => r.role === "FORM" || r.role === "OPTIONAL_COACHING").length;

  // Potential confusions based on stance and category
  const potentialConfusions: string[] = [];
  if (asana.primaryStance === "standing") {
    potentialConfusions.push("tadasana (neutral standing)", "virabhadrasana (lunging standing)");
  } else if (asana.primaryStance === "seated") {
    potentialConfusions.push("sukhasana (simple seated)", "dandasana (staff pose)");
  } else if (asana.primaryStance === "prone") {
    potentialConfusions.push("makarasana (flat prone)", "salabhasana (locust)");
  } else if (asana.primaryStance === "supine") {
    potentialConfusions.push("savasana (corpse pose)", "supta padangusthasana");
  } else if (asana.primaryStance === "inverted") {
    potentialConfusions.push("adho mukha svanasana", "sarvangasana");
  } else if (asana.primaryStance === "arm_balance") {
    potentialConfusions.push("bakasana", "chaturanga");
  }

  // Quality grading
  let quality: "A" | "B" | "C" | "D" = "B";
  if (asana.id === "warrior-ii-virabhadrasana-ii" || asana.status === "production") {
    quality = "A";
  } else if (ruleDetails.length >= 3 && ruleDetails.some((r) => r.isPoseDefining)) {
    quality = "B";
  } else if (ruleDetails.length >= 1) {
    quality = "C";
  } else {
    quality = "D";
  }

  auditList.push({
    id: asana.id,
    name: asana.name,
    canonicalId,
    category: asana.category,
    primaryStance: asana.primaryStance,
    rules: ruleDetails,
    ruleCount: ruleDetails.length,
    criticalRuleCount: ruleDetails.filter((r) => r.isCritical).length,
    quality,
    potentialConfusions,
    distinguishingFeatures: ruleDetails.map((r) => r.name),
    recommendedAction: quality === "A" ? "Keep & Benchmark" : "Maintain Discriminative Rules",
  });
}

console.log("=== PHASE 3.5 INVENTORY SUMMARY ===");
console.log(`Total Asanas Audited: ${auditList.length}`);
console.log(`Total Form & Identity Rules: ${totalRules}`);
console.log(`Total Identity / Critical Rules: ${totalCriticalRules}`);
console.log(`Total Form Rules: ${totalFormRules}`);
console.log(`Quality Breakdown: A: ${auditList.filter(a => a.quality === 'A').length}, B: ${auditList.filter(a => a.quality === 'B').length}, C: ${auditList.filter(a => a.quality === 'C').length}, D: ${auditList.filter(a => a.quality === 'D').length}`);

fs.writeFileSync("scripts/phase3_5_audit_result.json", JSON.stringify(auditList, null, 2));
