# app/core/database.py

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from fastapi import Depends
from typing import AsyncGenerator

# Database configuration
DATABASE_URL = "postgresql+asyncpg://rag_admin:rag_for_fun@localhost:5432/rag_for_fun"

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
