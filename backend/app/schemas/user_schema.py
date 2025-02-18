from pydantic import BaseModel, EmailStr

# send verification email
class SendEmailRequest(BaseModel):
    email: EmailStr

class SendEmailResponse(BaseModel):
    code: int
    msg: str
