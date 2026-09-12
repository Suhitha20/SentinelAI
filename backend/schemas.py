from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

from backend.models import DisasterType, SeverityLevel, DisasterStatus


class DisasterBase(BaseModel):
    """Base schema for disaster"""
    name: str = Field(..., min_length=1, max_length=255)
    disaster_type: DisasterType
    severity: SeverityLevel
    location: str = Field(..., min_length=1, max_length=500)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    description: Optional[str] = None
    affected_population: int = Field(default=0, ge=0)
    occurred_at: datetime


class DisasterCreate(DisasterBase):
    """Schema for creating a disaster"""
    pass


class DisasterUpdate(BaseModel):
    """Schema for updating a disaster"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    disaster_type: Optional[DisasterType] = None
    severity: Optional[SeverityLevel] = None
    status: Optional[DisasterStatus] = None
    location: Optional[str] = Field(None, min_length=1, max_length=500)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    description: Optional[str] = None
    affected_population: Optional[int] = Field(None, ge=0)
    occurred_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None


class DisasterResponse(DisasterBase):
    """Schema for disaster response"""
    id: int
    status: DisasterStatus
    reported_at: datetime
    updated_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True
