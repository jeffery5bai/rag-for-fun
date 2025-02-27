# app/core/config.py

class Settings:
    PROJECT_NAME: str = "RAG-for-fun"
    VERSION: str = "0.1.0"

settings = Settings()


import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = os.getenv("SMTP_PORT")
SMTP_USER = os.getenv("SMTP_USER")
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FRONTEND_SERVER_URL = os.getenv("FRONTEND_SERVER_URL")
BACKEND_SERVER_URL = os.getenv("BACKEND_SERVER_URL")