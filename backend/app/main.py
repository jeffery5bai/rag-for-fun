# app/main.py

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.routes.routes import initialize_routes


app = FastAPI(title="RAG-for-fun")

# Mount static files (CSS, JS)
app.mount("/static", StaticFiles(directory="app/views/static"), name="static")

# Set up Jinja2 for HTML templates
templates = Jinja2Templates(directory="app/views/templates")

# Include API routes
initialize_routes(app)

@app.get("/")
async def home():
    return templates.TemplateResponse("home.html", {"request": {}})
