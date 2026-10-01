import re
import json

# Parse allAsanasCatalog.ts
with open('src/features/ai-coach/data/allAsanasCatalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Also parse KNOWN_CRITICAL_RULES from AsanaCompletionGate.ts
with open('src/features/ai-coach/analysis/AsanaCompletionGate.ts', 'r', encoding='utf-8') as f:
    gate_text = f.read()

# Extract KNOWN_CRITICAL_RULES map
crit_rules_map = {}
match = re.search(r'export const KNOWN_CRITICAL_RULES:\s*Record<string,\s*string\[\]>\s*=\s*\{([\s\S]*?)\};', gate_text)
if match:
    gate_block = match.group(1)
    for line in gate_block.split('\n'):
        line = line.strip()
        m = re.match(r'["\']?([a-zA-Z0-9_-]+)["\']?:\s*\[(.*?)\]', line)
        if m:
            asana_id = m.group(1)
            raw_rules = m.group(2)
            rules = [r.strip().strip('"\'') for r in raw_rules.split(',') if r.strip().strip('"\'')]
            crit_rules_map[asana_id] = rules

print(f"Total asanas in KNOWN_CRITICAL_RULES: {len(crit_rules_map)}")

# Extract asanas from allAsanasCatalog.ts
asana_blocks = re.findall(r'(\{[^{}]*id:\s*["\']([^"\']+)["\'][\s\S]*?rules:\s*\[([\s\S]*?)\][\s\S]*?\n\s*\},?)', text)

# Let's do a more robust parse of all asana objects
# Find the start of ALL_ASANAS_CATALOG
catalog_start = text.find('export const ALL_ASANAS_CATALOG')
items = []

# Split by top-level object patterns in ALL_ASANAS_CATALOG
asanas_raw = re.findall(r'\{\s*id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*sanskritName:\s*["\']([^"\']+)["\'],\s*category:\s*["\']([^"\']+)["\'],\s*difficulty:\s*["\']([^"\']+)["\'],[\s\S]*?primaryStance:\s*["\']([^"\']+)["\'],[\s\S]*?rules:\s*\[([\s\S]*?)\],', text)

print(f"Found {len(asanas_raw)} asanas matched by regex")

rule_inventory = []
asana_inventory = {}

for asana in asanas_raw:
    a_id, name, sanskrit, category, difficulty, stance, rules_block = asana
    # parse rules in rules_block
    rule_matches = re.findall(r'createAngleRule\(\{([^}]+)\}\)|createDistanceRule\(\{([^}]+)\}\)|createAlignmentRule\(\{([^}]+)\}\)|\{\s*id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*metric:\s*["\']([^"\']+)["\'],\s*points:\s*\[([^\]]+)\],([\s\S]*?)\}', rules_block)
    
    parsed_rules = []
    # parse individually
    rule_chunks = re.findall(r'(?:createAngleRule|createDistanceRule|createAlignmentRule)\(\{[\s\S]*?\}\)|\{[^{}]*id:\s*["\'][^"\']+["\'][\s\S]*?\}', rules_block)
    
    for r_chunk in rule_chunks:
        id_m = re.search(r'id:\s*["\']([^"\']+)["\']', r_chunk)
        name_m = re.search(r'name:\s*["\']([^"\']+)["\']', r_chunk)
        metric_m = re.search(r'metric:\s*["\']([^"\']+)["\']', r_chunk)
        points_m = re.search(r'points:\s*\[([^\]]+)\]', r_chunk)
        target_m = re.search(r'target:\s*([0-9.]+)', r_chunk)
        tol_m = re.search(r'tolerance:\s*([0-9.]+)', r_chunk)
        sev_m = re.search(r'severity:\s*["\']([^"\']+)["\']', r_chunk)
        weight_m = re.search(r'weight:\s*([0-9.]+)', r_chunk)
        feedback_m = re.search(r'feedback:\s*["\']([^"\']+)["\']', r_chunk)
        
        r_id = id_m.group(1) if id_m else 'unknown'
        r_name = name_m.group(1) if name_m else ''
        r_metric = metric_m.group(1) if metric_m else ('distance' if 'createDistanceRule' in r_chunk else ('alignment' if 'createAlignmentRule' in r_chunk else 'angle'))
        r_points = [int(p.strip()) for p in points_m.group(1).split(',') if p.strip().isdigit()] if points_m else []
        r_target = float(target_m.group(1)) if target_m else None
        r_tol = float(tol_m.group(1)) if tol_m else None
        r_sev = sev_m.group(1) if sev_m else 'medium'
        r_weight = float(weight_m.group(1)) if weight_m else 1.0
        r_feedback = feedback_m.group(1) if feedback_m else ''
        
        is_crit = r_id in crit_rules_map.get(a_id, [])
        
        # Classification
        # Generic vs pose-defining
        # High severity / critical vs form
        parsed_rules.append({
            'id': r_id,
            'name': r_name,
            'metric': r_metric,
            'points': r_points,
            'target': r_target,
            'tolerance': r_tol,
            'severity': r_sev,
            'weight': r_weight,
            'feedback': r_feedback,
            'is_critical': is_crit
        })
        
        rule_inventory.append({
            'asana_id': a_id,
            'rule_id': r_id,
            'name': r_name,
            'metric': r_metric,
            'points': r_points,
            'target': r_target,
            'tolerance': r_tol,
            'severity': r_sev,
            'weight': r_weight,
            'is_critical': is_crit
        })
        
    asana_inventory[a_id] = {
        'id': a_id,
        'name': name,
        'sanskrit': sanskrit,
        'category': category,
        'stance': stance,
        'rules': parsed_rules,
        'rule_count': len(parsed_rules),
        'critical_count': len(crit_rules_map.get(a_id, []))
    }

print(f"Total rules inventoried: {len(rule_inventory)}")
print(f"Total critical rules mapped: {sum(len(v) for v in crit_rules_map.values())}")

with open('scratch/phase3_5_inventory.json', 'w') as f:
    json.dump({
        'rule_inventory_count': len(rule_inventory),
        'total_asanas': len(asana_inventory),
        'asanas': asana_inventory
    }, f, indent=2)

print("Saved scratch/phase3_5_inventory.json")
