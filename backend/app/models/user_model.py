from sqlalchemy import Column, String, TIMESTAMP, DateTime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
from sqlalchemy.future import select
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=True)  # Nullable for SSO users
    user_name = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    updated_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP")
    auth_provider = Column(String(50), nullable=False, default="local")

    def __init__(self, email, password_hash, user_name, auth_provider=None):
        self.email = email
        self.password_hash = password_hash
        self.user_name = user_name

        if auth_provider:
            self.auth_provider = auth_provider

    @staticmethod
    async def get_by_email(db: AsyncSession, email: str):
        # Fetch a record asynchronously
        result = await db.execute(select(User).filter_by(email=email))
        return result.scalar_one_or_none()

class VerificationCode(Base):
    __tablename__ = "verification_code"

    email = Column(String(255), primary_key=True, unique=True, nullable=False)
    verification_code = Column(String(50), nullable=False)
    expired_time = Column(DateTime, nullable=False)

    def __init__(self, email, v_code, expired_time):
        self.email = email
        self.verification_code = v_code
        self.expired_time = expired_time

    @staticmethod
    async def update(db: AsyncSession, email: str, v_code: str, expired_time: str):
        # Update a record asynchronously
        result = await db.execute(select(VerificationCode).filter_by(email=email))
        user = result.scalar_one_or_none()
        if user:
            user.verification_code = v_code
            user.expired_time = expired_time
            await db.commit()

    @staticmethod
    async def get_by_email(db: AsyncSession, email: str):
        # Fetch a record asynchronously
        result = await db.execute(select(VerificationCode).filter_by(email=email))
        return result.scalar_one_or_none()