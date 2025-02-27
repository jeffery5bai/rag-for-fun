# app/main.py

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from app.routes.routes import initialize_routes
from app.core.config import FRONTEND_SERVER_URL, BACKEND_SERVER_URL


app = FastAPI(title="RAG-for-fun")

origins = [FRONTEND_SERVER_URL, BACKEND_SERVER_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 允許哪些來源發起跨域請求
    allow_credentials=True,
    allow_methods=["*"],    # 允許所有 HTTP 方法，如 GET、POST、PUT 等
    allow_headers=["*"],    # 允許所有 Header
)

# Mount static files (CSS, JS)
app.mount("/static", StaticFiles(directory="app/views/static"), name="static")

# Set up Jinja2 for HTML templates
templates = Jinja2Templates(directory="app/views/templates")

# Include API routes
initialize_routes(app)

@app.get("/")
async def home():
    return templates.TemplateResponse("home.html", {"request": {}})
