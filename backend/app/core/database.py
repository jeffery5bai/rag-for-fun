# app/core/database.py

from typing import AsyncGenerator

from app.core.config import DATABASE_URL
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base

# Create an async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create a session factory
AsyncSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)

# Base model class
Base = declarative_base()


# Function to initialize database tables (called on startup)
async def init_db():
    async with engine.begin() as conn:
        # NOTE: all tables have already been created in advanced, there's no need (and should avoid) to initial it again.
        # await conn.run_sync(Base.metadata.create_all)
        print("Database connection established.")


# Dependency to get database session
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
