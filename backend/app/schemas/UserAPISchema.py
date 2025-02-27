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