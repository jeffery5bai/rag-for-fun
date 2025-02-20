# app/controllers/health_check.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import get_db
from sqlalchemy.exc import OperationalError

router = APIRouter(prefix="/api/v1/test")

@router.get("/db/")
async def health_check(db: AsyncSession = Depends(get_db)):
    try:
        # Try to execute a simple query to check if the DB is connected
        result = await db.execute(text("SELECT 1"))
        return {"status": "ok", "message": "Database is connected"}
    except OperationalError:
        raise HTTPException(status_code=500, detail="Database connection failed")
