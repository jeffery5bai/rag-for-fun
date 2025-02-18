# app/services/user_service.py
from fastapi import HTTPException
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import BaseModel, EmailStr
from datetime import datetime
from aiosmtplib import send, SMTP
from email.message import EmailMessage
from app.core.config import SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD, SENDER_EMAIL

# FastAPI-Mail Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=SMTP_EMAIL,
    MAIL_PASSWORD=SMTP_PASSWORD,
    MAIL_FROM=SMTP_EMAIL,
    MAIL_SERVER=SMTP_HOST,
    MAIL_PORT=SMTP_PORT,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

class EmailSchema(BaseModel):
    email: EmailStr
    v_code: str
    expired_time: str

# Function to send email (Simplified)
async def send_email(user_email: str, v_code: str, expired_time: datetime):
    subject = "[Email Verification]"    
    html_content = f"""
    <p>Hi, {user_email},</p>
    <p>Your verification code is: <b>{v_code}</b>.</p>
    <p>This code will expire at <b>{expired_time.strftime("%Y-%m-%d %H:%M:%S")}</b>.</p>
    """

    message = MessageSchema(
        subject=subject,
        recipients=[user_email],
        body=html_content,
        subtype="html"
    )

    try:
        fm = FastMail(conf)
        await fm.send_message(message)
        return {"msg": "Email sent successfully"}
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send verification email")