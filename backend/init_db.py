"""
Initialize database and load seed data
"""
import json
import os
from datetime import datetime
from models import init_db, get_session, Task, Settings
from config import Config


def load_seed_data(db_session):
    """Load seed data from seed.json"""
    seed_file = os.path.join(os.path.dirname(__file__), 'seed.json')
    
    if not os.path.exists(seed_file):
        print(f"seed.json not found at {seed_file}")
        return
    
    with open(seed_file, 'r') as f:
        seed_tasks = json.load(f)
    
    print(f"Loading {len(seed_tasks)} tasks from seed.json...")
    
    for task_data in seed_tasks:
        # Check if task already exists
        existing = db_session.query(Task).filter_by(id=task_data['id']).first()
        if existing:
            print(f"Skipping {task_data['id']} (already exists)")
            continue
        
        # Parse date
        due_date = datetime.fromisoformat(task_data['dueDate']).date()
        
        # Create task
        task = Task(
            id=task_data['id'],
            title=task_data['title'],
            due_date=due_date,
            duration=task_data['duration'],
            tag=task_data['tag'],
            completed=task_data.get('completed', False)
        )
        
        db_session.add(task)
        print(f"Added: {task_data['title']}")
    
    db_session.commit()
    print(f"Seed data loaded successfully!")


def initialize_settings(db_session):
    """Initialize default settings"""
    settings = db_session.query(Settings).first()
    
    if not settings:
        settings = Settings(task_cap=15, duration_units='minutes')
        db_session.add(settings)
        db_session.commit()
        print("Default settings created")
    else:
        print("Settings already exist")


def main():
    """Main initialization function"""
    print("=" * 60)
    print("Campus Life Planner - Database Initialization")
    print("=" * 60)
    print()
    
    # Initialize database
    config = Config()
    database_dir = os.path.dirname(config.DATABASE_PATH)
    os.makedirs(database_dir, exist_ok=True)
    
    print(f"Database location: {config.DATABASE_PATH}")
    
    engine = init_db(config.SQLALCHEMY_DATABASE_URI)
    db_session = get_session(engine)
    
    print("Database tables created")
    print()
    
    # Load seed data
    load_seed_data(db_session)
    print()
    
    # Initialize settings
    initialize_settings(db_session)
    print()
    
    # Display summary
    task_count = db_session.query(Task).count()
    completed_count = db_session.query(Task).filter_by(completed=True).count()
    
    print("=" * 60)
    print("Database Summary:")
    print(f"   Total Tasks: {task_count}")
    print(f"   Completed: {completed_count}")
    print(f"   Pending: {task_count - completed_count}")
    print("=" * 60)
    print()
    print("Database initialization complete!")
    print("You can now start the Flask server with: python app.py")
    
    db_session.close()


if __name__ == '__main__':
    main()
