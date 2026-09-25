import json
import os
import re

with open('supabase_assets_raw.json', 'r', encoding='utf-8') as f:
    assets = json.load(f)

# Known custom mappings / refinements for exact Sanskrit & English titles
SPECIAL_MAPPINGS = {
    "archers-akarna-dhanurasana": ("Archer's Pose", "Akarna Dhanurasana", "seated", "intermediate"),
    "banana-supta-nitambasana": ("Banana Pose", "Supta Nitambasana", "restorative", "beginner"),
    "big-toe-padangushthasana": ("Big Toe Pose", "Padangushthasana", "standing", "beginner"),
    "bird-of-paradise-svarga-dvijasana": ("Bird of Paradise", "Svarga Dvijasana", "balancing", "advanced"),
    "boat-navasana": ("Boat Pose", "Navasana", "core", "intermediate"),
    "bound-angle-baddha-konasana": ("Bound Angle Pose", "Baddha Konasana", "seated", "beginner"),
    "bow-dhanurasana": ("Bow Pose", "Dhanurasana", "backbend", "intermediate"),
    "box-chakravakasana": ("Box Pose", "Chakravakasana", "restorative", "beginner"),
    "bridge-setu-bandha-sarvangasana": ("Bridge Pose", "Setu Bandha Sarvangasana", "backbend", "beginner"),
    "butterfly": ("Butterfly Pose", "Baddha Konasana", "seated", "beginner"),
    "camel-ustrasana": ("Camel Pose", "Ustrasana", "backbend", "intermediate"),
    "cat-marjariasana": ("Cat Pose", "Marjariasana", "restorative", "beginner"),
    "caterpillar": ("Caterpillar Pose", "Paschimottanasana Variation", "restorative", "beginner"),
    "chair-utkatasana": ("Chair Pose", "Utkatasana", "standing", "beginner"),
    "childs-pose-balasana": ("Child's Pose", "Balasana", "restorative", "beginner"),
    "chin-stand-ganda-bherundasana": ("Chin Stand", "Ganda Bherundasana", "inversion", "advanced"),
    "cobra-bhujangasana": ("Cobra Pose", "Bhujangasana", "backbend", "beginner"),
    "corpse-savasana": ("Corpse Pose", "Savasana", "restorative", "beginner"),
    "cow-bitilasana": ("Cow Pose", "Bitilasana", "restorative", "beginner"),
    "cow-face-gomukhasana": ("Cow Face Pose", "Gomukhasana", "seated", "intermediate"),
    "crane-bakasana": ("Crane Pose", "Bakasana", "balancing", "advanced"),
    "crescent-lunge-ashta-chandrasana": ("Crescent Lunge", "Ashta Chandrasana", "standing", "intermediate"),
    "crescent-lunge-on-knee-anjaneyasana": ("Low Lunge", "Anjaneyasana", "standing", "beginner"),
    "crescent-moon-ardha-chandrasana": ("Crescent Moon Pose", "Ardha Chandrasana", "balancing", "intermediate"),
    "crooked-monkey": ("Crooked Monkey", "Markatasana Variation", "seated", "intermediate"),
    "crow-kakasana": ("Crow Pose", "Kakasana", "balancing", "intermediate"),
    "dancer-natarajasana": ("Dancer Pose", "Natarajasana", "balancing", "advanced"),
    "deaf-mans-karna-pidasana": ("Deaf Man's Pose", "Karnapidasana", "inversion", "advanced"),
    "dolphin-shishumarasana": ("Dolphin Pose", "Shishumarasana", "inversion", "intermediate"),
    "downward-dog-adho-mukha-svanasana": ("Downward-Facing Dog", "Adho Mukha Svanasana", "standing", "beginner"),
    "eagle-garudasana": ("Eagle Pose", "Garudasana", "balancing", "intermediate"),
    "easy-sukhasana": ("Easy Pose", "Sukhasana", "seated", "beginner"),
    "eight-angle-ashtavakrasana": ("Eight-Angle Pose", "Ashtavakrasana", "balancing", "advanced"),
    "eight-point-ashtangasana": ("Eight-Limbed Pose", "Ashtangasana", "core", "beginner"),
    "elbow-balance-shayanasana": ("Elbow Balance", "Shayanasana", "inversion", "advanced"),
    "elephant-trunk-eka-hasta-bhujasana": ("Elephant's Trunk Pose", "Eka Hasta Bhujasana", "balancing", "advanced"),
    "extended-puppy-uttana-shishosana": ("Extended Puppy Pose", "Uttana Shishosana", "restorative", "beginner"),
    "extended-side-angle-utthita-parshvakonasana": ("Extended Side Angle", "Utthita Parshvakonasana", "standing", "intermediate"),
    "fire-log-agnistambhasana": ("Fire Log Pose", "Agnistambhasana", "seated", "intermediate"),
    "fish-matsyasana": ("Fish Pose", "Matsyasana", "backbend", "beginner"),
    "forearm-balance-pincha-mayurasana": ("Forearm Stand", "Pincha Mayurasana", "inversion", "advanced"),
    "frog-bhekasana": ("Frog Pose", "Bhekasana", "backbend", "intermediate"),
    "front-splits-hanumanasana": ("Front Splits", "Hanumanasana", "seated", "advanced"),
    "garland-malasana": ("Garland Pose", "Malasana", "standing", "beginner"),
    "gate-parighasana": ("Gate Pose", "Parighasana", "standing", "beginner"),
    "goddess-utkata-konasana": ("Goddess Pose", "Utkata Konasana", "standing", "beginner"),
    "half-moon-ardha-chandrasana": ("Half Moon Pose", "Ardha Chandrasana", "balancing", "intermediate"),
    "half-pigeon-ardha-kapotasana": ("Half Pigeon Pose", "Ardha Kapotasana", "seated", "intermediate"),
    "handstand-adho-mukha-vrksasana": ("Handstand", "Adho Mukha Vrksasana", "inversion", "advanced"),
    "happy-baby-ananda-balasana": ("Happy Baby Pose", "Ananda Balasana", "restorative", "beginner"),
    "headstand-sirsasana": ("Headstand", "Sirsasana", "inversion", "advanced"),
    "hero-virasana": ("Hero Pose", "Virasana", "seated", "beginner"),
    "king-pigeon-eka-pada-rajakapotasana": ("King Pigeon Pose", "Eka Pada Rajakapotasana", "backbend", "advanced"),
    "legs-up-the-wall-viparita-karani": ("Legs-Up-The-Wall Pose", "Viparita Karani", "restorative", "beginner"),
    "lizard-uttana-pristhasana": ("Lizard Pose", "Uttana Pristhasana", "standing", "intermediate"),
    "lotus-padmasana": ("Lotus Pose", "Padmasana", "seated", "intermediate"),
    "low-push-up-chaturanga-dandasana": ("Four-Limbed Staff Pose", "Chaturanga Dandasana", "core", "intermediate"),
    "mountain-tadasana": ("Mountain Pose", "Tadasana", "standing", "beginner"),
    "peacock-mayurasana": ("Peacock Pose", "Mayurasana", "balancing", "advanced"),
    "pigeon-kapotasana": ("Pigeon Pose", "Kapotasana", "backbend", "advanced"),
    "plank-phalakasana": ("Plank Pose", "Phalakasana", "core", "beginner"),
    "plow-halasana": ("Plow Pose", "Halasana", "inversion", "intermediate"),
    "pyramid-parshvottanasana": ("Pyramid Pose", "Parshvottanasana", "standing", "intermediate"),
    "rabbit-shashankasana": ("Rabbit Pose", "Shashankasana", "restorative", "beginner"),
    "reclined-bound-angle-supta-baddha-konasana": ("Reclining Bound Angle", "Supta Baddha Konasana", "restorative", "beginner"),
    "revolved-triangle-parivritta-trikonasana": ("Revolved Triangle Pose", "Parivritta Trikonasana", "standing", "intermediate"),
    "scale-tolasana": ("Scale Pose", "Tolasana", "balancing", "intermediate"),
    "seated-forward-fold-paschimottanasana": ("Seated Forward Fold", "Paschimottanasana", "seated", "beginner"),
    "shoulderstand-sarvangasana": ("Shoulderstand", "Sarvangasana", "inversion", "intermediate"),
    "side-crow-parsva-bakasana": ("Side Crow Pose", "Parsva Bakasana", "balancing", "advanced"),
    "side-plank-vasishthasana": ("Side Plank Pose", "Vasishthasana", "core", "intermediate"),
    "sphynx-salamba-bhujangasana": ("Sphinx Pose", "Salamba Bhujangasana", "backbend", "beginner"),
    "sphinx-salamba-bhujangasana": ("Sphinx Pose", "Salamba Bhujangasana", "backbend", "beginner"),
    "staff-dandasana": ("Staff Pose", "Dandasana", "seated", "beginner"),
    "standing-forward-bend-uttanasana": ("Standing Forward Bend", "Uttanasana", "standing", "beginner"),
    "thunderbolt-vajrasana": ("Thunderbolt Pose", "Vajrasana", "seated", "beginner"),
    "tree-vrksasana": ("Tree Pose", "Vrksasana", "balancing", "beginner"),
    "triangle-trikonasana": ("Triangle Pose", "Trikonasana", "standing", "beginner"),
    "upward-facing-dog-urdhva-mukha-shvanasana": ("Upward-Facing Dog", "Urdhva Mukha Svanasana", "backbend", "intermediate"),
    "upward-plank-purvottanasana": ("Upward Plank Pose", "Purvottanasana", "core", "intermediate"),
    "warrior-i-virabhadrasana-a": ("Warrior I", "Virabhadrasana I", "standing", "beginner"),
    "warrior-ii-virabhadrasana-ii": ("Warrior II", "Virabhadrasana II", "standing", "beginner"),
    "warrior-iii-virabhadrasana-c": ("Warrior III", "Virabhadrasana III", "balancing", "intermediate"),
    "wheel-urdhva-dhanurasana": ("Wheel Pose", "Urdhva Dhanurasana", "backbend", "advanced"),
    "wild-thing-chamatkarasana": ("Wild Thing", "Camatkarasana", "backbend", "intermediate"),
    "wind-removing-pavanamuktasana": ("Wind-Relieving Pose", "Pavanamuktasana", "restorative", "beginner"),
}

def normalize_asset(filename):
    base = re.sub(r'\.(webp|png|jpg|jpeg)$', '', filename, flags=re.I)
    
    if base in SPECIAL_MAPPINGS:
        eng, skt, cat, diff = SPECIAL_MAPPINGS[base]
        return {
            "id": base,
            "displayName": eng,
            "sanskritName": skt,
            "category": cat,
            "difficulty": diff,
            "filename": filename
        }
    
    # Generic Sanskrit decomposition
    parts = base.split('-')
    
    # Try splitting at known sanskrit words
    sanskrit_idx = -1
    for idx, part in enumerate(parts):
        if any(w in part for w in ['asana', 'karani', 'mudra', 'shirshasana', 'padasana', 'svanasana', 'vrksasana', 'halasana', 'tadasana', 'padmasana', 'dandasana', 'balasana', 'savasana', 'virasana', 'matsyasana', 'ustrasana', 'bhujangasana', 'dhanurasana', 'bakasana', 'kakasana', 'garudasana', 'sukhasana', 'mayurasana', 'koundinyasana', 'galavasana', 'bhekasana', 'hanumanasana', 'malasana', 'parighasana', 'konasana', 'hastasana', 'natarajasana', 'pidasana', 'shishumarasana', 'ashtavakrasana', 'ashtangasana', 'shayanasana', 'bhujasana', 'pindasana', 'shishosana', 'parshvakonasana', 'padangushthasana', 'agnistambhasana', 'tittibhasana', 'brahmacharyasana', 'kraunchasana', 'karandavasana', 'vatayanasana', 'rajakapotasana', 'vajrasana', 'pristhasana', 'shalabhasana', 'matsyendrasana', 'pashasana', 'lolasana', 'kapotasana', 'phalakasana', 'parshvottanasana', 'shashankasana', 'advasana', 'bharadvajasana', 'gherandasana', 'marichyasana', 'vishvamitrasana', 'tolasana', 'vrischikasana', 'paschimottanasana', 'padmottanasana', 'richikasana', 'durvasasana', 'samakonasana', 'trikonasana', 'purvottanasana', 'virabhadrasana', 'chamatkarasana', 'pavanamuktasana', 'vyaghrasana', 'kurmasana']):
            # Look backwards for prefixes
            start = idx
            while start > 0 and parts[start-1] in ['akarna', 'supta', 'svarga', 'baddha', 'setu', 'bandha', 'ganda', 'ashta', 'ardha', 'adho', 'mukha', 'eka', 'pada', 'hasta', 'garbha', 'uttana', 'dvi', 'paripurna', 'laghu', 'parivritta', 'parivrtta', 'upavishta', 'salamba', 'dandayamana', 'virabhadrasana', 'prasarita', 'mukta', 'trianga']:
                start -= 1
            sanskrit_idx = start
            break
            
    if sanskrit_idx > 0:
        eng_parts = parts[:sanskrit_idx]
        skt_parts = parts[sanskrit_idx:]
        eng = ' '.join(eng_parts).title()
        skt = ' '.join(skt_parts).title()
    else:
        eng = base.replace('-', ' ').title()
        skt = None
        
    eng = eng.replace(' Iii', ' III').replace(' Ii', ' II').replace(' I', ' I')
    eng = eng.replace('Childs', "Child's").replace('Archers', "Archer's").replace('Mans', "Man's").replace('Fishes', "Fishes'").replace('Visvamitras', "Visvamitra's").replace('Marichis', "Marichi's").replace('Gherandas', "Gheranda's").replace('Bharadvajas', "Bharadvaja's")
    
    # Infer category
    category = "standing"
    if any(k in base for k in ['seated', 'lotus', 'easy', 'hero', 'staff', 'paschimottanasana', 'gomukhasana', 'baddha-konasana', 'butterfly', 'fire-log', 'shoelace', 'cow-face']):
        category = "seated"
    elif any(k in base for k in ['headstand', 'shoulderstand', 'handstand', 'plow', 'forearm-balance', 'chin-stand', 'pincha', 'sirsasana', 'sarvangasana', 'halasana']):
        category = "inversion"
    elif any(k in base for k in ['wheel', 'camel', 'cobra', 'bow', 'fish', 'wild-thing', 'locust', 'sphinx', 'bhujangasana', 'dhanurasana', 'ustrasana']):
        category = "backbend"
    elif any(k in base for k in ['crow', 'crane', 'dancer', 'tree', 'half-moon', 'eagle', 'bird-of-paradise', 'scale', 'eight-angle', 'peacock', 'flying', 'side-crow', 'vrksasana', 'bakasana', 'natarajasana', 'garudasana']):
        category = "balancing"
    elif any(k in base for k in ['plank', 'boat', 'side-plank', 'low-push-up', 'chaturanga', 'navasana', 'eight-point']):
        category = "core"
    elif any(k in base for k in ['forward-bend', 'forward-fold', 'pyramid', 'uttanasana', 'prasarita']):
        category = "forward_bend"
    elif any(k in base for k in ['child', 'corpse', 'cat', 'cow', 'puppy', 'legs-up', 'happy-baby', 'supine', 'savasana', 'balasana', 'restorative', 'banana']):
        category = "restorative"
        
    difficulty = "intermediate"
    if any(k in base for k in ['mountain', 'child', 'corpse', 'easy', 'tree', 'warrior-i', 'warrior-ii', 'cobra', 'chair', 'bridge', 'cat', 'cow', 'plank', 'triangle', 'staff', 'butterfly', 'happy-baby']):
        difficulty = "beginner"
    elif any(k in base for k in ['handstand', 'chin-stand', 'scorpion', 'splits', 'eight-angle', 'peacock', 'bird-of-paradise', 'two-legs-behind', 'flying', 'wheel', 'king-pigeon', 'wheel-urdhva']):
        difficulty = "advanced"

    return {
        "id": base,
        "displayName": eng,
        "sanskritName": skt,
        "category": category,
        "difficulty": difficulty,
        "filename": filename
    }

results = [normalize_asset(a['name']) for a in assets]
print(f"Normalized {len(results)} assets")
with open("normalized_asanas_inventory.json", "w", encoding="utf-8") as out:
    json.dump(results, out, indent=2)
print("Saved to normalized_asanas_inventory.json")
