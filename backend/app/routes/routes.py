# app/routes/user_routes.py

from fastapi import FastAPI
from app.controllers import UserManager
from app.controllers import HealthCheck

def initialize_routes(app: FastAPI):
    app.include_router(UserManager.router)
    app.include_router(HealthCheck.router)
