import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog.ts";
import { resolveCanonicalAsanaId } from "../src/features/ai-coach/analysis/AsanaCanonicalIdResolver.ts";
import * as fs from "fs";

const criticalMap: Record<string, string[]> = {};

for (const asana of ALL_ASANAS_CATALOG) {
  const critical = asana.rules.filter(r => r.severity === "high" || r.isSafety || (r.weight ?? 1) >= 3);
  if (critical.length > 0) {
    const ids = critical.map(r => r.id);
    // register both normalized ID and canonical ID
    criticalMap[asana.id] = ids;
    const canonicalId = resolveCanonicalAsanaId(asana.id);
    if (!criticalMap[canonicalId]) {
      criticalMap[canonicalId] = ids;
    }
  }
}

console.log(`Generated ${Object.keys(criticalMap).length} critical rule mappings.`);

const lines: string[] = [];
lines.push("export const KNOWN_CRITICAL_RULES: Record<string, string[]> = {");
for (const [key, rules] of Object.entries(criticalMap).sort((a, b) => a[0].localeCompare(b[0]))) {
  lines.push(`  "${key}": ${JSON.stringify(rules)},`);
}
lines.push("};");

fs.writeFileSync(
  "d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/data/generated_critical_rules.ts",
  lines.join("\n"),
  "utf-8"
);
console.log("Written generated_critical_rules.ts");
