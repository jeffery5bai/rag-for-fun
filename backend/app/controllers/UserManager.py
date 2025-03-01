import random
from datetime import datetime, timedelta

from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.database import get_db
from app.models.user_model import User, VerificationCode
from app.schemas.UserAPISchema import (
    SendEmailRequest,
    SendEmailResponse,
    UserLoginRequest,
    UserLoginResponse,
    UserRegisterRequest,
    UserRegisterResponse,
)
from app.services.auth import create_access_token, get_current_user
from app.services.mail import send_email
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/api/auth", tags=["User"])
jwt_router = APIRouter(prefix="/api/auth", tags=["User"], dependencies=[Depends(get_current_user)])

"""
Registered API
- Send verification email: f"{BASE_URL}{PREFIX}/send_email"
- Register new user: f"{BASE_URL}{PREFIX}/register"
- Login user: f"{BASE_URL}{PREFIX}/login"
"""


@router.post("/send_email/", response_model=SendEmailResponse)
async def send_verification_email(request: SendEmailRequest, db: AsyncSession = Depends(get_db)):
    user_email = request.email
    # Check if email is already registered
    user = await User.get_by_email(db, user_email)
    if user:
        return SendEmailResponse(code=1, msg="This email has been registered")

    # Generate verification code
    v_code = str(random.randint(100000, 999999)).zfill(6)
    expired_time = datetime.now() + timedelta(hours=1)

    if await VerificationCode.get_by_email(db, user_email):
        new_record = await VerificationCode.update(db, user_email, v_code, expired_time)
    else:
        new_record = VerificationCode(user_email, v_code, expired_time)
        db.add(new_record)

    await db.commit()

    # Send email
    await send_email(request.email, v_code, expired_time)

    return SendEmailResponse(code=0, msg="Verification code has been sent to your email account")


@router.post("/register/", response_model=UserRegisterResponse)
async def verify_and_register(request: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    user_email = request.email
    user_password = request.hashed_password
    user_name = request.name
    v_code = request.verification_code

    # Verify the 6-number code
    user = await VerificationCode.get_by_email(db, user_email)
    if user is None:  # if user exists
        return UserRegisterResponse(
            code=1, msg="User email doesn't exist. Please get verification code for this account."
        )

    if v_code != user.verification_code:  # if the code is correct
        return UserRegisterResponse(code=2, msg="Wrong verification code! Please try again.")

    if datetime.now() >= user.expired_time:  # if the code is expired
        return UserRegisterResponse(
            code=2, msg="This verification code is expired. Please get another one for this account."
        )

    # If passed, create new user
    new_user = User(user_email, user_password, user_name)
    db.add(new_user)
    await db.commit()

    return UserRegisterResponse(code=0, msg=f"Welcome {user_name}! Your new account has been created.")


@router.post("/login/", response_model=UserLoginResponse)
async def login(request: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    user_email = request.email
    user_password = request.hashed_password

    user = await User.get_by_email(db, user_email)
    if user is None:
        return UserRegisterResponse(code=1, msg="User email doesn't exist. Sign-up your new account?.")

    if user_password != user.hashed_password:
        return UserRegisterResponse(code=2, msg="Wrong password! Please try again.")

    # Success
    jwt_token = create_access_token(
        data={"sub": user.user_name}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return UserRegisterResponse(
        code=0, msg=f"Welcome {user.user_name}!", name=user.user_name, jwt_token=jwt_token
    )


# # New API to be implemented
# @router.post("/<url_to_be_used>/", response_model=<pre-defined_response_schema>)
# async def your_function(request: <pre-defined_request_schema>, db: AsyncSession = Depends(get_db)):
#     ...
