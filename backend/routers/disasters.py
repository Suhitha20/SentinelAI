from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging

from backend.database import get_db
from backend.models import Disaster, DisasterStatus
from backend.schemas import DisasterCreate, DisasterUpdate, DisasterResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/disasters", response_model=DisasterResponse, status_code=status.HTTP_201_CREATED)
def create_disaster(disaster: DisasterCreate, db: Session = Depends(get_db)):
    """Create a new disaster event"""
    try:
        db_disaster = Disaster(**disaster.model_dump())
        db.add(db_disaster)
        db.commit()
        db.refresh(db_disaster)
        logger.info(f"Created disaster: {db_disaster.id} - {db_disaster.name}")
        return db_disaster
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating disaster: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create disaster event"
        )


@router.get("/disasters", response_model=List[DisasterResponse])
def list_disasters(
    skip: int = 0,
    limit: int = 100,
    status_filter: DisasterStatus = None,
    db: Session = Depends(get_db)
):
    """List all disaster events with optional filtering"""
    try:
        query = db.query(Disaster)
        
        if status_filter:
            query = query.filter(Disaster.status == status_filter)
        
        disasters = query.offset(skip).limit(limit).all()
        return disasters
    except Exception as e:
        logger.error(f"Error listing disasters: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve disasters"
        )


@router.get("/disasters/{disaster_id}", response_model=DisasterResponse)
def get_disaster(disaster_id: int, db: Session = Depends(get_db)):
    """Get a specific disaster event by ID"""
    disaster = db.query(Disaster).filter(Disaster.id == disaster_id).first()
    
    if not disaster:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Disaster with ID {disaster_id} not found"
        )
    
    return disaster


@router.put("/disasters/{disaster_id}", response_model=DisasterResponse)
def update_disaster(
    disaster_id: int,
    disaster_update: DisasterUpdate,
    db: Session = Depends(get_db)
):
    """Update a disaster event"""
    db_disaster = db.query(Disaster).filter(Disaster.id == disaster_id).first()
    
    if not db_disaster:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Disaster with ID {disaster_id} not found"
        )
    
    try:
        update_data = disaster_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_disaster, field, value)
        
        db.commit()
        db.refresh(db_disaster)
        logger.info(f"Updated disaster: {db_disaster.id} - {db_disaster.name}")
        return db_disaster
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating disaster {disaster_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update disaster event"
        )


@router.delete("/disasters/{disaster_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_disaster(disaster_id: int, db: Session = Depends(get_db)):
    """Delete a disaster event"""
    db_disaster = db.query(Disaster).filter(Disaster.id == disaster_id).first()
    
    if not db_disaster:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Disaster with ID {disaster_id} not found"
        )
    
    try:
        db.delete(db_disaster)
        db.commit()
        logger.info(f"Deleted disaster: {disaster_id}")
    except Exception as e:
        db.rollback()
        logger.error(f"Error deleting disaster {disaster_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete disaster event"
        )
