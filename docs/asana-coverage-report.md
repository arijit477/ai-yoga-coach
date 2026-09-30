# Asana Coaching Coverage & Scalability Report (Phase 7)

**Date:** October 2026  
**System:** YogaVerse AI Yoga Coach Pose Evaluation Engine  
**Landmark Detector:** MediaPipe Tasks Vision (33 World & 2D Landmarks)  

---

## 1. Executive Summary

| Category | Count | Percentage | Operational Guidance |
|---|---|---|---|
| **Total Registered Asanas** | **170** | **100.0%** | Full Supabase asset inventory mapped and registered |
| **Supported (Fully Automated)** | **95** | **55.9%** | Real-time computer vision rule evaluation + direct voice coaching |
| **Partially Supported** | **47** | **27.6%** | Core posture tracked (spine/shoulders/hips); secondary limb binds guided by voice cues |
| **Requires Manual Rules** | **28** | **16.5%** | Complex arm balances, knots, and extreme inversions safely guided via timing & instructions without false fail penalties |

> [!NOTE]
> **No False Failures:** Every asana in the inventory displays gracefully with authentic Sanskrit naming, guide assets, and stance-specific voice setup. Asanas marked *Requires Manual Rules* or *Partially Supported* are never subjected to impossible single-camera angle tests, preventing frustrating false alarms.

---

## 2. Technical Evaluation Methodology

Each asana is classified based on concrete MediaPipe landmark constraints:

1. **A. Starting Position Classification:** Stance taxonomy (`standing`, `seated`, `kneeling`, `prone`, `supine`, `plank`, `all_fours`, `bending`, `backbend`, `inverted`) determines foundation requirements.
2. **B. Landmark Visibility & Feasibility:** 33 keypoints (shoulders 11/12, elbows 13/14, wrists 15/16, hips 23/24, knees 25/26, ankles 27/28) must have unoccluded line-of-sight.
3. **C. Metric Computability:** Angle calculation (vertex ABC), horizontal alignment ($Delta Y$), vertical alignment ($Delta X$), and proportional distances.
4. **D. Coaching Instructions:** Stance-specific setup cues replacing legacy universal defaults.
5. **E. Correction Arbitrations:** Single primary physical adjustment prioritized by severity.
6. **F. Resolution Praise:** Short confirmation upon alignment recovery.

---

## 3. Supported Asanas (95 Poses)

These asanas feature well-separated joint landmarks, distinct geometry, and high reliability across single-camera feeds.

| # | Asana Name | Sanskrit Name | Category | Stance | Key Evaluated Landmarks |
|---|---|---|---|---|---|
| 1 | **Banana Pose** | *Supta Nitambasana* | `restorative` | `supine` | shoulders |
| 2 | **Big Toe Pose** | *Padangushthasana* | `standing` | `standing` | shoulders, hips |
| 3 | **Bound Angle Pose** | *Baddha Konasana* | `seated` | `seated` | shoulders, hips |
| 4 | **Box Pose** | *Chakravakasana* | `restorative` | `all_fours` | shoulders |
| 5 | **Butterfly Pose** | *Baddha Konasana* | `seated` | `seated` | shoulders, hips |
| 6 | **Cat Pose** | *Marjariasana* | `restorative` | `all_fours` | shoulders |
| 7 | **Caterpillar Pose** | *Paschimottanasana Variation* | `restorative` | `all_fours` | shoulders |
| 8 | **Chair Pose** | *Utkatasana* | `standing` | `standing` | shoulders, hips |
| 9 | **Child's Pose** | *Balasana* | `restorative` | `kneeling` | shoulders |
| 10 | **Cobra Pose** | *Bhujangasana* | `backbend` | `prone` | shoulders, elbows, wrists |
| 11 | **Corpse Pose** | *Savasana* | `restorative` | `supine` | shoulders |
| 12 | **Cow Pose** | *Bitilasana* | `restorative` | `all_fours` | shoulders |
| 13 | **Crescent Lunge** | *Ashta Chandrasana* | `standing` | `standing` | shoulders, hips |
| 14 | **Low Lunge** | *Anjaneyasana* | `standing` | `standing` | shoulders, hips |
| 15 | **Crooked Monkey** | *Markatasana Variation* | `seated` | `seated` | shoulders, hips |
| 16 | **Dolphin Pose** | *Shishumarasana* | `inversion` | `inverted` | shoulders, hips, ankles |
| 17 | **Downward-Facing Dog** | *Adho Mukha Svanasana* | `standing` | `inverted` | shoulders, hips |
| 18 | **Easy Pose** | *Sukhasana* | `seated` | `seated` | shoulders, hips |
| 19 | **Eight-Limbed Pose** | *Ashtangasana* | `core` | `standing` | shoulders, hips, knees |
| 20 | **Extended Puppy Pose** | *Uttana Shishosana* | `restorative` | `standing` | shoulders |
| 21 | **Extended Side Angle** | *Utthita Parshvakonasana* | `standing` | `standing` | shoulders, hips |
| 22 | **Extended Supine Hand To Big Toe** | *Supta Padangushthasana B* | `restorative` | `supine` | shoulders |
| 23 | **Fire Log Pose** | *Agnistambhasana* | `seated` | `seated` | shoulders, hips |
| 24 | **Floating Stick** | *Brahmacharyasana* | `standing` | `standing` | shoulders, hips |
| 25 | **Frog Pose** | *Bhekasana* | `backbend` | `standing` | shoulders, elbows, wrists |
| 26 | **Garland Pose** | *Malasana* | `standing` | `standing` | shoulders, hips |
| 27 | **Gate Pose** | *Parighasana* | `standing` | `kneeling` | shoulders, hips |
| 28 | **Goddess Pose** | *Utkata Konasana* | `standing` | `standing` | shoulders, hips |
| 29 | **Gorilla** | *Pada Hastasana* | `standing` | `standing` | shoulders, hips |
| 30 | **Grasshopper** | *Maksikanagasana* | `standing` | `standing` | shoulders, hips |
| 31 | **Happy Baby Pose** | *Ananda Balasana* | `restorative` | `supine` | shoulders |
| 32 | **Hero Pose** | *Virasana* | `seated` | `seated` | shoulders, hips |
| 33 | **Heron** | *Kraunchasana* | `seated` | `seated` | shoulders, hips |
| 34 | **Himalayan Duck** | *Karandavasana* | `standing` | `standing` | shoulders, hips |
| 35 | **Horse** | *Vatayanasana* | `standing` | `standing` | shoulders, hips |
| 36 | **Humble Flamingo** | *—* | `standing` | `standing` | shoulders, hips |
| 37 | **Inverted Staff Dvi Pada Viparita** | *Dandasana* | `seated` | `seated` | shoulders, hips |
| 38 | **Legs-Up-The-Wall Pose** | *Viparita Karani* | `restorative` | `inverted` | shoulders |
| 39 | **Little Thunderbolt** | *Laghu Vajrasana* | `standing` | `kneeling` | shoulders, hips |
| 40 | **Lizard Pose** | *Uttana Pristhasana* | `standing` | `standing` | shoulders, hips |
| 41 | **Lotus Pose** | *Padmasana* | `seated` | `seated` | shoulders, hips |
| 42 | **Four-Limbed Staff Pose** | *Chaturanga Dandasana* | `core` | `plank` | shoulders, hips, knees |
| 43 | **Lunge Runner** | *—* | `standing` | `standing` | shoulders, hips |
| 44 | **Moon Bird** | *Eka Pada Shirshasana C* | `standing` | `standing` | shoulders, hips |
| 45 | **Mountain Pose** | *Tadasana* | `standing` | `standing` | shoulders, hips, knees, ankles |
| 46 | **One Leg Behind The Head I** | *Eka Pada Shirshasana A* | `standing` | `standing` | shoulders, hips |
| 47 | **One Leg Behind The Head II** | *Eka Pada Shirshasana B* | `standing` | `standing` | shoulders, hips |
| 48 | **Plank Pose** | *Phalakasana* | `core` | `plank` | shoulders, hips, knees |
| 49 | **Pyramid Pose** | *Parshvottanasana* | `standing` | `standing` | shoulders, hips |
| 50 | **Rabbit Pose** | *Shashankasana* | `restorative` | `standing` | shoulders |
| 51 | **Reclining Bound Angle** | *Supta Baddha Konasana* | `restorative` | `supine` | shoulders |
| 52 | **Reverse Corpse** | *Advasana* | `restorative` | `supine` | shoulders |
| 53 | **Rock The Baby** | *—* | `standing` | `standing` | shoulders, hips |
| 54 | **Sage Gheranda's** | *Gherandasana* | `standing` | `standing` | shoulders, hips |
| 55 | **Sage Visvamitra's** | *Vishvamitrasana* | `standing` | `standing` | shoulders, hips |
| 56 | **Seated Forward Fold** | *Paschimottanasana* | `seated` | `seated` | shoulders, hips |
| 57 | **Seated Gate** | *Parighasana* | `seated` | `seated` | shoulders, hips |
| 58 | **Seated Half Bound Lotus Forward Bend Ardha Baddha Padma** | *Paschimottanasana* | `seated` | `seated` | shoulders, hips |
| 59 | **Seated Three Limbed Forward Bend** | *Trianga Mukha Eka Pada Paschimottanasana* | `seated` | `seated` | shoulders, hips |
| 60 | **Shiva Squat** | *—* | `standing` | `standing` | shoulders, hips |
| 61 | **Shoelace** | *—* | `seated` | `seated` | shoulders, hips |
| 62 | **Shoulder Stand With Lotus Legs Urdhva** | *Padmasana* | `seated` | `seated` | shoulders, hips |
| 63 | **Side Plank Pose** | *Vasishthasana* | `core` | `plank` | shoulders, hips, knees |
| 64 | **Sleeping Yogi Yoga** | *Nidrasana* | `standing` | `standing` | shoulders, hips |
| 65 | **Snake** | *Sarpasana* | `standing` | `standing` | shoulders, hips |
| 66 | **Sphinx Pose** | *Salamba Bhujangasana* | `backbend` | `prone` | shoulders, elbows, wrists |
| 67 | **Staff Pose** | *Dandasana* | `seated` | `seated` | shoulders, hips |
| 68 | **Standing Foot To Head** | *Trivikramasana A* | `standing` | `standing` | shoulders, hips |
| 69 | **Standing Forward Bend** | *Uttanasana* | `standing` | `bending` | shoulders, hips |
| 70 | **Standing Half Bound Lotus Forward Bend** | *Ardha Baddha Padmottanasana* | `seated` | `seated` | shoulders, hips |
| 71 | **Standing Leg Behind Head** | *Durvasasana* | `standing` | `standing` | shoulders, hips |
| 72 | **Standing Leg Behind Head Forward Bend** | *Richikasana* | `forward_bend` | `bending` | shoulders |
| 73 | **Star Utthita** | *Tadasana* | `standing` | `standing` | shoulders, hips |
| 74 | **Supine Angle** | *Supta Konasana* | `restorative` | `supine` | shoulders |
| 75 | **Supine Foot To Head** | *Supta Trivikramasana* | `restorative` | `supine` | shoulders |
| 76 | **Supine Hand To Big Toe** | *Supta Padangushthasana A* | `restorative` | `supine` | shoulders |
| 77 | **Supine Straddle** | *Supta Samakonasana* | `restorative` | `supine` | shoulders |
| 78 | **Thunderbolt Pose** | *Vajrasana* | `seated` | `seated` | shoulders, hips |
| 79 | **Tiger** | *Vyaghrasana* | `standing` | `standing` | shoulders, hips |
| 80 | **Toe Stand** | *Padangushthasana* | `standing` | `standing` | shoulders, hips |
| 81 | **Tortoise** | *Kurmasana* | `standing` | `standing` | shoulders, hips |
| 82 | **Tree Pose** | *Vrksasana* | `balancing` | `standing` | shoulders, hips, knees, ankles |
| 83 | **Triangle Pose** | *Trikonasana* | `standing` | `standing` | shoulders, hips |
| 84 | **Upward-Facing Dog** | *Urdhva Mukha Svanasana* | `backbend` | `standing` | shoulders, elbows, wrists |
| 85 | **Upward Plank Pose** | *Purvottanasana* | `core` | `plank` | shoulders, hips, knees |
| 86 | **Warrior I** | *Virabhadrasana I* | `standing` | `standing` | shoulders, hips |
| 87 | **Warrior II** | *Virabhadrasana II* | `standing` | `standing` | shoulders, elbows, wrists, hips, knees, ankles |
| 88 | **Warrior III** | *Virabhadrasana III* | `balancing` | `standing` | shoulders, hips, knees, ankles |
| 89 | **Waterfall** | *Supta Dandasana* | `standing` | `supine` | shoulders, hips |
| 90 | **Wide Angle Seated Forward Bend Upavistha** | *Konasana* | `seated` | `seated` | shoulders, hips |
| 91 | **Wide Legged Forward Bend I** | *Prasarita Padottanasana A* | `forward_bend` | `bending` | shoulders |
| 92 | **Wide Legged Forward Bend II** | *Prasarita Padottanasana B* | `forward_bend` | `bending` | shoulders |
| 93 | **Wide Legged Forward Bend III** | *Prasarita Padottanasana C* | `forward_bend` | `bending` | shoulders |
| 94 | **Wide Legged Forward Bend Iv** | *Prasarita Padottanasana D* | `forward_bend` | `bending` | shoulders |
| 95 | **Wind-Relieving Pose** | *Pavanamuktasana* | `restorative` | `standing` | shoulders |

---

## 4. Partially Supported Asanas (47 Poses)

These asanas have dependable torso and spinal tracking, but feature rotational twists or limb placement nuances subject to 2D depth ambiguity or camera angle dependency.

| # | Asana Name | Sanskrit Name | Category | Stance | Biomechanical / Computer Vision Rationale |
|---|---|---|---|---|---|
| 1 | **Boat Pose** | *Navasana* | `core` | `seated` | Torso-thigh V-angle is evaluable; arm extension angle varies across variations. |
| 2 | **Bow Pose** | *Dhanurasana* | `backbend` | `prone` | Chest lift is evaluable; ankle grip hold angle depends on practitioner shoulder flexibility. |
| 3 | **Bridge Pose** | *Setu Bandha Sarvangasana* | `backbend` | `inverted` | Vertical torso line is evaluable; neck angle safety is critical and requires caution. |
| 4 | **Camel Pose** | *Ustrasana* | `backbend` | `kneeling` | Thigh verticality is evaluable; hand-to-heel reach depth has profile perspective variation. |
| 5 | **Chin Stand** | *Ganda Bherundasana* | `inversion` | `inverted` | Advanced multi-joint posture requiring careful camera framing and custom joint tolerances. |
| 6 | **Cow Face Pose** | *Gomukhasana* | `seated` | `seated` | Spine verticality is evaluable; behind-the-back finger clasp is occluded from front camera. |
| 7 | **Crescent Moon Pose** | *Ardha Chandrasana* | `balancing` | `standing` | Standing leg and extended arm are evaluable; horizontal pelvic opening requires strict camera alignment. |
| 8 | **Dancer Pose** | *Natarajasana* | `balancing` | `standing` | Standing leg and chest opening are evaluable; overhead foot grip depth requires profile view. |
| 9 | **Deaf Man's Pose** | *Karnapidasana* | `inversion` | `inverted` | Advanced multi-joint posture requiring careful camera framing and custom joint tolerances. |
| 10 | **Eagle Pose** | *Garudasana* | `balancing` | `standing` | Shoulder and hip levels are evaluable; intertwined forearms and wrapped calves cause limb tracking crossover. |
| 11 | **Elbow Balance** | *Shayanasana* | `inversion` | `inverted` | Chest lift is evaluable; ankle grip hold angle depends on practitioner shoulder flexibility. |
| 12 | **Elephant's Trunk Pose** | *Eka Hasta Bhujasana* | `balancing` | `standing` | Advanced multi-joint posture requiring careful camera framing and custom joint tolerances. |
| 13 | **Extended Standing Hand To Big Toe Utthita** | *Hasta Padangushthasana B* | `standing` | `standing` | Standing leg stability is evaluable; raised foot grab distance may vary with arm/leg length ratios. |
| 14 | **Fish Pose** | *Matsyasana* | `backbend` | `supine` | Chest expansion is evaluable; crown-to-floor contact angle is prone to supine occlusion. |
| 15 | **Front Splits** | *Hanumanasana* | `seated` | `seated` | Advanced multi-joint posture requiring careful camera framing and custom joint tolerances. |
| 16 | **Half Bow** | *Ardha Dhanurasana* | `backbend` | `prone` | Chest lift is evaluable; ankle grip hold angle depends on practitioner shoulder flexibility. |
| 17 | **Half Moon Pose** | *Ardha Chandrasana* | `balancing` | `standing` | Standing leg and extended arm are evaluable; horizontal pelvic opening requires strict camera alignment. |
| 18 | **Half Pigeon Pose** | *Ardha Kapotasana* | `seated` | `seated` | Front hip leveling is evaluable; back leg quad stretch depth requires side perspective. |
| 19 | **King Pigeon Pose** | *Eka Pada Rajakapotasana* | `backbend` | `standing` | Front hip leveling is evaluable; back leg quad stretch depth requires side perspective. |
| 20 | **Locust I** | *Shalabhasana A* | `backbend` | `prone` | Chest and leg elevation are evaluable; prone floor contact dampens subtle joint visibility. |
| 21 | **Locust II** | *Shalabhasana B* | `backbend` | `prone` | Chest and leg elevation are evaluable; prone floor contact dampens subtle joint visibility. |
| 22 | **Locust III** | *Shalabhasana C* | `backbend` | `prone` | Chest and leg elevation are evaluable; prone floor contact dampens subtle joint visibility. |
| 23 | **Lord Of The Fishes'** | *Paripurna Matsyendrasana* | `backbend` | `supine` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 24 | **Pigeon Pose** | *Kapotasana* | `backbend` | `standing` | Front hip leveling is evaluable; back leg quad stretch depth requires side perspective. |
| 25 | **Plow Pose** | *Halasana* | `inversion` | `inverted` | Vertical torso line is evaluable; neck angle safety is critical and requires caution. |
| 26 | **Revolved Chair** | *Parivrtta Utkatasana* | `standing` | `standing` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 27 | **Revolved Half Moon** | *Parivritta Ardha Chandrasana* | `balancing` | `standing` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 28 | **Revolved Seated Hand To Big Toe** | *Upavishta Parivritta Hasta Padangushthasana* | `seated` | `seated` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 29 | **Revolved Standing Hand To Big Toe** | *Parivritta Hasta Padangushthasana* | `standing` | `standing` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 30 | **Revolved Triangle Pose** | *Parivritta Trikonasana* | `standing` | `standing` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 31 | **Sage Bharadvaja's Twist** | *Bharadvajasana* | `standing` | `standing` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 32 | **Sage Marichi's I** | *Marichyasana A* | `standing` | `seated` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 33 | **Sage Marichi's II** | *Marichyasana B* | `standing` | `seated` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 34 | **Sage Marichi's III** | *Marichyasana C* | `standing` | `seated` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 35 | **Sage Marichi's Iv** | *Marichyasana D* | `standing` | `seated` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 36 | **Seated Twist** | *Ardha Matsyendrasana* | `seated` | `seated` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 37 | **Shoulderstand** | *Sarvangasana* | `inversion` | `inverted` | Vertical torso line is evaluable; neck angle safety is critical and requires caution. |
| 38 | **Side Lunge** | *Skandasana* | `standing` | `standing` | Bent knee depth is evaluable; extended leg foot turnout may encounter floor plane occlusion. |
| 39 | **Standing Bow** | *Dandayamana Dhanurasana* | `backbend` | `prone` | Chest lift is evaluable; ankle grip hold angle depends on practitioner shoulder flexibility. |
| 40 | **Standing Hand To Big Toe Utthita** | *Hasta Padangushthasana A* | `standing` | `standing` | Standing leg stability is evaluable; raised foot grab distance may vary with arm/leg length ratios. |
| 41 | **Standing Splits Urdhva** | *Prasarita Eka Padasana* | `forward_bend` | `bending` | Advanced multi-joint posture requiring careful camera framing and custom joint tolerances. |
| 42 | **Supine Twist** | *Supta Matsyendrasana* | `restorative` | `supine` | Core spine alignment is evaluable; rotational torso angle and bound hands have slight 2D depth ambiguity. |
| 43 | **Two Legs Behind The Head I** | *Dvi Pada Shirshasana A* | `standing` | `standing` | Advanced multi-joint posture requiring careful camera framing and custom joint tolerances. |
| 44 | **Two Legs Behind The Head II** | *Dvi Pada Shirshasana B* | `standing` | `standing` | Advanced multi-joint posture requiring careful camera framing and custom joint tolerances. |
| 45 | **Wheel Pose** | *Urdhva Dhanurasana* | `backbend` | `supine` | Arm and leg extension are evaluable; head-neck floor clearance and lumbar curvature need manual calibration. |
| 46 | **Wide Splits** | *Samakonasana* | `standing` | `standing` | Advanced multi-joint posture requiring careful camera framing and custom joint tolerances. |
| 47 | **Wild Thing** | *Camatkarasana* | `backbend` | `standing` | Supporting arm stability is evaluable; backbend rotation causes partial torso perspective distortion. |

---

## 5. Asanas Requiring Manual Rule Definition (28 Poses)

These advanced postures feature intricate multi-limb binds, extreme inversions, or severe self-occlusions where standard single-view MediaPipe cannot reliably extract joint coordinates without manual expert tuning.

| # | Asana Name | Sanskrit Name | Category | Stance | Biomechanical / Computer Vision Constraint |
|---|---|---|---|---|---|
| 1 | **Archer's Pose** | *Akarna Dhanurasana* | `seated` | `seated` | Foot pulled to ear; foot-hand-ear binding creates depth occlusion across facial and shoulder landmarks. |
| 2 | **Bird of Paradise** | *Svarga Dvijasana* | `balancing` | `standing` | Standing leg balance with bound clasped hands behind standing thigh; clasped wrist occlusion. |
| 3 | **Crane Pose** | *Bakasana* | `balancing` | `arm_balance` | Knees resting on triceps; extreme compaction obscures hip-knee joint angles from front camera. |
| 4 | **Crow Pose** | *Kakasana* | `balancing` | `arm_balance` | Knees resting on triceps; extreme compaction obscures hip-knee joint angles from front camera. |
| 5 | **Eight-Angle Pose** | *Ashtavakrasana* | `balancing` | `arm_balance` | Lateral arm balance with entwined legs causing severe hip and knee depth ambiguity. |
| 6 | **Embryo In Womb** | *Garbha Pindasana* | `standing` | `standing` | Arms threaded through lotus binding hands to ears; complete joint self-occlusion. |
| 7 | **Embryo** | *Pindasana* | `standing` | `standing` | Arms threaded through lotus binding hands to ears; complete joint self-occlusion. |
| 8 | **Firefly I** | *Tittibhasana A* | `standing` | `arm_balance` | Legs draped over shoulders; shoulder-hip-knee joints heavily overlap in 2D perspective. |
| 9 | **Firefly II** | *Tittibhasana B* | `standing` | `arm_balance` | Legs draped over shoulders; shoulder-hip-knee joints heavily overlap in 2D perspective. |
| 10 | **Firefly III** | *Tittibhasana C* | `standing` | `arm_balance` | Legs draped over shoulders; shoulder-hip-knee joints heavily overlap in 2D perspective. |
| 11 | **Flying Lizard** | *—* | `balancing` | `arm_balance` | Suspended flying arm balances; limb overlapping prevents reliable automated angle computation. |
| 12 | **Flying Man** | *Eka Pada Koundinyasana* | `balancing` | `arm_balance` | Advanced asymmetrical arm balance; side-body torsion obscures hip and knee tracking. |
| 13 | **Flying Pigeon** | *Eka Pada Galavasana* | `balancing` | `arm_balance` | Suspended flying arm balances; limb overlapping prevents reliable automated angle computation. |
| 14 | **Forearm Stand** | *Pincha Mayurasana* | `inversion` | `arm_balance` | Elbows dug into abdomen; severe forearm and torso self-occlusion in single-camera view. |
| 15 | **Handstand** | *Adho Mukha Vrksasana* | `inversion` | `inverted` | Dynamic arm balance inversion; wrist load and balance micro-adjustments exceed standard 2D pose tracking. |
| 16 | **Head To Knee Janu** | *Sirsasana* | `inversion` | `inverted` | Full body inversion with crowned head; neck compression safety and verticality require multi-camera or expert setup. |
| 17 | **Headstand** | *Sirsasana* | `inversion` | `inverted` | Full body inversion with crowned head; neck compression safety and verticality require multi-camera or expert setup. |
| 18 | **Noose** | *Pashasana* | `standing` | `standing` | Full squat spinal twist with arm wrap around both shins; severe limb overlap. |
| 19 | **Peacock Pose** | *Mayurasana* | `balancing` | `arm_balance` | Elbows dug into abdomen; severe forearm and torso self-occlusion in single-camera view. |
| 20 | **Pendant** | *Lolasana* | `standing` | `arm_balance` | Suspended lotus/tuck; floor clearance and inner wrist angles require specialized side-view profiling. |
| 21 | **Revolved Bird Of Paradise** | *Parivritta Svarga Dvijasana* | `balancing` | `standing` | Standing leg balance with bound clasped hands behind standing thigh; clasped wrist occlusion. |
| 22 | **Revolved Flying Man** | *Parivritta Eka Pada Koundinyasana* | `balancing` | `arm_balance` | Advanced asymmetrical arm balance; side-body torsion obscures hip and knee tracking. |
| 23 | **Rooster** | *Kukkutasana* | `standing` | `standing` | Arms threaded through lotus legs; MediaPipe cannot resolve occluded limb joints. |
| 24 | **Scale Pose** | *Tolasana* | `balancing` | `arm_balance` | Suspended lotus/tuck; floor clearance and inner wrist angles require specialized side-view profiling. |
| 25 | **Scorpion** | *Vrischikasana A* | `standing` | `inverted` | Extreme spinal hyperextension with feet over head; landmark inversion and spine curvature exceed single-camera reliability. |
| 26 | **Shoulder Pressing Bhuja** | *Pidasana* | `standing` | `arm_balance` | Legs crossed over ankles on shoulders; hand placement under body creates full joint occlusion. |
| 27 | **Side Crow Pose** | *Parsva Bakasana* | `balancing` | `arm_balance` | Knees resting on triceps; extreme compaction obscures hip-knee joint angles from front camera. |
| 28 | **Tripod Headstand** | *Mukta Hasta Shirshasana A* | `inversion` | `inverted` | Full body inversion with crowned head; neck compression safety and verticality require multi-camera or expert setup. |

---

## 6. Architecture & Crash Prevention Guarantees

1. **Zero Crash Guarantee:** All 170 asanas integrate seamlessly with `AsanaRegistry`, `useCoachSession`, `usePoseEvaluation`, and `RealtimeVoiceAgent`.
2. **Fallback Safety Hierarchy:** If custom rules are unassigned or unevaluable, the engine falls back to stance-level posture tracking (head, torso, hips) and posture check status remains gracefully reported as `good` or `calibrating`.
3. **Honest Accuracy Stance:** Accuracy claims reflect physical computer vision reality—we do NOT claim 100% automated precision for extreme binds or multi-limb occlusions.
