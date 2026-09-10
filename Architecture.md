                         AI YOGA COACH
                              │
                 ┌────────────┴────────────┐
                 │                         │
            VISION ENGINE              AI COACH
                 │                         │
             Browser                   OpenAI
                 │                         │
             Camera                       │
                 ↓                         │
           Pose Model                     │
                 ↓                         │
         33 Body Landmarks                │
                 ↓                         │
        Temporal Smoothing                 │
                 ↓                         │
        Pose Feature Engine                │
                 ↓                         │
       ┌─────────┴─────────┐               │
       ↓                   ↓               │
   Rule Engine          ML Model           │
       │                   │               │
       └─────────┬─────────┘               │
                 ↓                         │
           Pose Evaluation ───────────────→│
                 │                         ↓
                 │                   OpenAI LLM
                 │                         │
                 │                 Conversation
                 │                 Personalization
                 │                 Explanation
                 │                         │
                 └─────────────────────────┘
                           ↓
                    Alice / Kevin
                           ↓
                    Voice / Avatar



-------------------------------------------------------------------------------------------





                    The production architecture I recommend

Ultimately:


┌─────────────────────────────────────────────┐
│                  REACT APP                  │
│                                             │
│  Camera → MediaPipe → Pose Analysis        │
│                       ↓                     │
│                 Rule Engine                 │
│                       ↓                     │
│             Score / Corrections             │
│                       ↓                     │
│                 Coach UI                    │
└──────────────────────┬──────────────────────┘
                       │
              Structured Events
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                 FASTAPI                     │
│                                             │
│  Auth / Users                               │
│  Asana API                                  │
│  Rules API                                  │
│  Coach Sessions                             │
│  Subscription / Entitlements                │
│  Session History                            │
│  AI Coaching Service                        │
│  Analytics                                  │
└──────────────┬──────────────┬───────────────┘
               │              │
               ▼              ▼
        ┌────────────┐   ┌─────────────┐
        │ PostgreSQL │   │ Supabase    │
        │            │   │ Storage     │
        │ Asanas     │   │ Images      │
        │ Rules      │   │ Videos      │
        │ Sessions   │   │ Assets      │
        │ Users      │   └─────────────┘
        └────────────┘
               │
               ▼
        ┌─────────────┐
        │ AI Service  │
        │             │
        │ LLM         │
        └─────────────┘



UI Flow ------------------->>


                    AI PERSONAL YOGA COACH
                              │
                              ▼
                  Select Coach: Alice / Kevin
                              │
                              ▼
                    Start Free Session
                              │
                              ▼
                ┌─────────────────────────┐
                │      ASANA 1 / 10       │
                │                         │
                │   Supabase Image        │
                │        ↓                │
                │   User follows pose     │
                │        ↓                │
                │   MediaPipe tracking    │
                │        ↓                │
                │   AI Coach analyzes     │
                │        ↓                │
                │   Corrections + Score   │
                │        ↓                │
                │   Hold / Complete       │
                └────────────┬────────────┘
                             │
                             ▼
                ┌─────────────────────────┐
                │      ASANA 2 / 10       │
                │      Next image         │
                │      Next instructions  │
                │      Analysis           │
                └────────────┬────────────┘
                             │
                            ...
                             │
                             ▼
                ┌─────────────────────────┐
                │     ASANA 10 / 10       │
                └────────────┬────────────┘
                             │
                             ▼
                   FREE SESSION COMPLETE
                             │
                             ▼
                ┌─────────────────────────┐
                │    Your Session Score   │
                │    10 Asanas Completed  │
                │    Progress / Results   │
                └────────────┬────────────┘
                             │
                             ▼
                  🔒 174+ More Asanas
                    Unlock Premium