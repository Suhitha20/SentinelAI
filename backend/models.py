from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Enum
from datetime import datetime
import enum

from backend.database import Base


class DisasterType(str, enum.Enum):
    """Types of disasters"""
    EARTHQUAKE = "earthquake"
    FLOOD = "flood"
    HURRICANE = "hurricane"
    WILDFIRE = "wildfire"
    TORNADO = "tornado"
    TSUNAMI = "tsunami"
    VOLCANIC = "volcanic"
    OTHER = "other"


class SeverityLevel(str, enum.Enum):
    """Severity levels for disasters"""
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    CRITICAL = "critical"


class DisasterStatus(str, enum.Enum):
    """Status of disaster response"""
    ACTIVE = "active"
    MONITORING = "monitoring"
    CONTAINED = "contained"
    RESOLVED = "resolved"


class Disaster(Base):
    """Disaster event model"""
    __tablename__ = "disasters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    disaster_type = Column(Enum(DisasterType), nullable=False)
    severity = Column(Enum(SeverityLevel), nullable=False)
    status = Column(Enum(DisasterStatus), default=DisasterStatus.ACTIVE)
    
    # Location information
    location = Column(String(500), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Details
    description = Column(Text, nullable=True)
    affected_population = Column(Integer, default=0)
    
    # Timestamps
    occurred_at = Column(DateTime, nullable=False)
    reported_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    
    def __repr__(self):
        return f"<Disaster(id={self.id}, name='{self.name}', type='{self.disaster_type}', severity='{self.severity}')>"
