import random
from datetime import datetime, timedelta

from app.core.database import get_db
from app.models.user_model import User, VerificationCode
from app.schemas.user_schema import SendEmailRequest, SendEmailResponse
from app.services.mail import send_email
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/api/v1/user", tags=["User"])


# Sign-on API
@router.post("/send_email/", response_model=SendEmailResponse)
async def send_verification_email(request: SendEmailRequest, db: AsyncSession = Depends(get_db)):
    user_email = request.email
    # Step 1: Check if email is already registered
    user = await User.get_by_email(db, user_email)
    if user:
        return SendEmailResponse(code=1, msg="This email has been registered")

    # Step 2: Generate verification code
    v_code = str(random.randint(100000, 999999)).zfill(6)
    expired_time = datetime.now() + timedelta(hours=1)

    if await VerificationCode.get_by_email(db, user_email):
        new_record = await VerificationCode.update(db, user_email, v_code, expired_time)
    else:
        new_record = VerificationCode(user_email, v_code, expired_time)
        db.add(new_record)

    await db.commit()

    # Step 3: Send email
    await send_email(request.email, v_code, expired_time)

    return SendEmailResponse(code=0, msg="Verification code has been sent to your email account")


# # New API to be implemented
# @router.post("/<url_to_be_used>/", response_model=<pre-defined_response_schema>)
# async def your_function(request: <pre-defined_request_schema>, db: AsyncSession = Depends(get_db)):
#     ...
