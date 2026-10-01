import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog.ts";
import { getAsanaCoachingProfile } from "../src/features/ai-coach/services/AsanaCoachingProfileService.ts";
import { resolveCanonicalAsanaId } from "../src/features/ai-coach/analysis/AsanaCanonicalIdResolver.ts";
import { KNOWN_CRITICAL_RULES } from "../src/features/ai-coach/analysis/AsanaCompletionGate.ts";
import * as fs from "fs";

interface AsanaAuditRecord {
  id: string;
  slug: string;
  displayName: string;
  sanskritName: string;
  canonicalId: string;
  category: string;
  stance: string;
  difficulty: string;
  rulesCount: number;
  criticalRulesCount: number;
  criticalRuleIds: string[];
  rules: {
    id: string;
    name: string;
    metric: string;
    points: number[];
    weight: number;
    severity: string;
  }[];
  isPoseSpecific: boolean;
  status: "A — Strong" | "B — Adequate" | "C — Weak" | "D — Insufficient";
  statusReason: string;
}

const records: AsanaAuditRecord[] = [];

let strongCount = 0;
let adequateCount = 0;
let weakCount = 0;
let insufficientCount = 0;

for (const asana of ALL_ASANAS_CATALOG) {
  const canonicalId = resolveCanonicalAsanaId(asana.id);
  const profile = getAsanaCoachingProfile(asana.id);
  const criticalRuleIds = KNOWN_CRITICAL_RULES[canonicalId] || [];

  const rules = asana.rules || [];

  // Check if rules contain pose-specific joint angles / distance / specific biomechanics
  // Generic rules are only horizontal/vertical shoulder/hip/spine alignment
  const poseSpecificRules = rules.filter(r => {
    if (r.metric === "angle") return true;
    if (r.metric === "distance") return true;
    if (r.name.toLowerCase().includes("knee") || r.name.toLowerCase().includes("elbow") || r.name.toLowerCase().includes("foot") || r.name.toLowerCase().includes("chest") || r.name.toLowerCase().includes("arm") || r.name.toLowerCase().includes("leg")) {
      return true;
    }
    return false;
  });

  const isPoseSpecific = poseSpecificRules.length > 0;
  
  let status: "A — Strong" | "B — Adequate" | "C — Weak" | "D — Insufficient";
  let statusReason = "";

  if (criticalRuleIds.length > 0 && poseSpecificRules.length >= 2 && asana.validation?.status === "production") {
    status = "A — Strong";
    statusReason = "Production-ready with critical rules and multiple pose-defining joint constraints";
    strongCount++;
  } else if (criticalRuleIds.length > 0 && poseSpecificRules.length >= 1) {
    status = "B — Adequate";
    statusReason = "Critical identity rules defined with at least 1 pose-specific constraint";
    adequateCount++;
  } else if (poseSpecificRules.length > 0) {
    status = "C — Weak";
    statusReason = "Has joint angle/distance rules but lacks dedicated critical identity registration in KNOWN_CRITICAL_RULES";
    weakCount++;
  } else {
    status = "D — Insufficient";
    statusReason = "Only generic spine/shoulder/hip alignment rules; lacks pose-defining geometry";
    insufficientCount++;
  }

  records.push({
    id: asana.id,
    slug: asana.slug,
    displayName: asana.displayName,
    sanskritName: asana.sanskritName,
    canonicalId,
    category: asana.category,
    stance: profile.stance,
    difficulty: asana.difficulty || "intermediate",
    rulesCount: rules.length,
    criticalRulesCount: criticalRuleIds.length,
    criticalRuleIds,
    rules: rules.map(r => ({
      id: r.id,
      name: r.name,
      metric: r.metric,
      points: r.points,
      weight: r.weight,
      severity: r.severity,
    })),
    isPoseSpecific,
    status,
    statusReason,
  });
}

console.log("==========================================");
console.log("         ASANA 170 AUDIT RESULTS          ");
console.log("==========================================");
console.log(`Total Asanas Audited: ${records.length}`);
console.log(`A — Strong:        ${strongCount}`);
console.log(`B — Adequate:      ${adequateCount}`);
console.log(`C — Weak:          ${weakCount}`);
console.log(`D — Insufficient:  ${insufficientCount}`);
console.log("==========================================");

fs.writeFileSync(
  "d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/data/asanaAuditRecords.json",
  JSON.stringify(records, null, 2)
);
console.log("Written asanaAuditRecords.json");
