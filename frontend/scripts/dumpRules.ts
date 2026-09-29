import { ASANA_RULES_CATALOG } from "../src/features/ai-coach/analysis/rules/poseRulesRegistry";
import fs from "fs";
import path from "path";

const targetPath = path.resolve(process.cwd(), "public/data/rules.json");
const dataDir = path.dirname(targetPath);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(targetPath, JSON.stringify(ASANA_RULES_CATALOG, null, 2));
console.log(`Successfully dumped rules to ${targetPath}`);
