"""
Database models for Campus Life Planner
"""
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Task(Base):
    """Task model matching the frontend data structure"""
    __tablename__ = 'tasks'
    
    id = Column(String, primary_key=True)
    title = Column(String(200), nullable=False)
    due_date = Column(Date, nullable=False)
    duration = Column(Integer, nullable=False)  # in minutes
    tag = Column(String(50), nullable=False)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert task to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'title': self.title,
            'dueDate': self.due_date.isoformat() if self.due_date else None,
            'duration': self.duration,
            'tag': self.tag,
            'completed': self.completed,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None
        }


class Settings(Base):
    """Settings model for user preferences"""
    __tablename__ = 'settings'
    
    id = Column(Integer, primary_key=True)
    task_cap = Column(Integer, default=15)  # weekly task target
    duration_units = Column(String(20), default='minutes')  # 'minutes' or 'hours'
    
    def to_dict(self):
        """Convert settings to dictionary for JSON serialization"""
        return {
            'taskCap': self.task_cap,
            'durationUnits': self.duration_units
        }


# Database initialization function
def init_db(database_url):
    """Initialize database and create tables"""
    engine = create_engine(database_url, echo=True)
    Base.metadata.create_all(engine)
    return engine


def get_session(engine):
    """Get database session"""
    Session = sessionmaker(bind=engine)
    return Session()
