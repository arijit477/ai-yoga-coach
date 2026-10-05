What is happening
Your frontend:
https://ai-yoga-coach-br648scpx-arijits-projects-f22bee41.vercel.app

calls:
https://ai-yoga-coach-975a.onrender.com/api/ai-coach/realtime/session

Before the actual POST request, the browser sends an OPTIONS preflight request.
Your Render backend needs to respond with something like:
Access-Control-Allow-Origin: https://ai-yoga-coach-br648scpx-arijits-projects-f22bee41.vercel.app

But it isn't, so Chrome blocks the request:
No 'Access-Control-Allow-Origin' header is present

Most likely cause in your project
Your FastAPI backend probably has something similar to:
app.add_middleware(    CORSMiddleware,    allow_origins=[        "http://localhost:5173",    ],    allow_credentials=True,    allow_methods=["*"],    allow_headers=["*"],)


That works locally, but your deployed Vercel domain isn't included.
Fix
In your FastAPI main.py / application entry file, configure CORS to include your production frontend.
For example:
from fastapi.middleware.cors import CORSMiddlewareorigins = [    "http://localhost:5173",    "http://localhost:3000",    # Production Vercel URL    "https://ai-yoga-coach-br648scpx-arijits-projects-f22bee41.vercel.app",    # Your main Vercel domain, if applicable    "https://ai-yoga-coach-zeta.vercel.app",]app.add_middleware(    CORSMiddleware,    allow_origins=origins,    allow_credentials=True,    allow_methods=["*"],    allow_headers=["*"],)


Then redeploy the Render backend.
But there's an important detail
Your current frontend URL is:
ai-yoga-coach-br648scpx-arijits-projects-f22bee41.vercel.app

That looks like a Vercel deployment/preview URL, not necessarily your permanent production URL.
If you deploy another Vercel version, the URL can change.
So ideally, your CORS configuration should include your stable production domain as well.
For example:
origins = [    "http://localhost:5173",    "https://ai-yoga-coach-zeta.vercel.app",    "https://ai-yoga-coach-br648scpx-arijits-projects-f22bee41.vercel.app",]


Don't use this as the first fix
You might see suggestions like:
allow_origins=["*"]


That can make the error disappear, but because you're using:
allow_credentials=True


you shouldn't blindly use wildcard CORS for this application.
For your client project, explicitly allowing the frontend domains is better.