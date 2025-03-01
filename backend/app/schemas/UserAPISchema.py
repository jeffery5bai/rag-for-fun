from typing import Optional
from pydantic import BaseModel, EmailStr


# send verification email
class SendEmailRequest(BaseModel):
    email: EmailStr


class SendEmailResponse(BaseModel):
    code: int
    msg: str


# user register
class UserRegisterRequest(BaseModel):
    email: EmailStr
    name: str
    hashed_password: str
    verification_code: str


class UserRegisterResponse(BaseModel):
    code: int
    msg: str


# user login
class UserLoginRequest(BaseModel):
    email: EmailStr
    hashed_password: str


class UserLoginResponse(BaseModel):
    code: int
    msg: str
    name: Optional[str] = None
    # jwt_token: str
