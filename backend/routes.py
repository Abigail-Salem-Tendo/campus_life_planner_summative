"""
API routes for Campus Life Planner
"""
from flask import Blueprint, jsonify, request
from datetime import datetime, date
from models import Task, Settings
from sqlalchemy.orm import Session

api = Blueprint('api', __name__, url_prefix='/api')


# ============ TASK ROUTES ============

@api.route('/tasks', methods=['GET'])
def get_tasks():
    """Get all tasks"""
    db: Session = request.db_session
    tasks = db.query(Task).all()
    return jsonify([task.to_dict() for task in tasks])


@api.route('/tasks/<task_id>', methods=['GET'])
def get_task(task_id):
    """Get a specific task by ID"""
    db: Session = request.db_session
    task = db.query(Task).filter_by(id=task_id).first()
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task.to_dict())


@api.route('/tasks', methods=['POST'])
def create_task():
    """Create a new task"""
    db: Session = request.db_session
    data = request.get_json()
    
    # Validate required fields
    required = ['id', 'title', 'dueDate', 'duration', 'tag']
    for field in required:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Parse date
    try:
        due_date = datetime.fromisoformat(data['dueDate']).date()
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid date format'}), 400
    
    # Create task
    task = Task(
        id=data['id'],
        title=data['title'],
        due_date=due_date,
        duration=data['duration'],
        tag=data['tag'],
        completed=data.get('completed', False)
    )
    
    db.add(task)
    db.commit()
    db.refresh(task)
    
    return jsonify(task.to_dict()), 201


@api.route('/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    """Update an existing task"""
    db: Session = request.db_session
    task = db.query(Task).filter_by(id=task_id).first()
    
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    data = request.get_json()
    
    # Update fields if provided
    if 'title' in data:
        task.title = data['title']
    if 'dueDate' in data:
        try:
            task.due_date = datetime.fromisoformat(data['dueDate']).date()
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid date format'}), 400
    if 'duration' in data:
        task.duration = data['duration']
    if 'tag' in data:
        task.tag = data['tag']
    if 'completed' in data:
        task.completed = data['completed']
    
    task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(task)
    
    return jsonify(task.to_dict())


@api.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete a task"""
    db: Session = request.db_session
    task = db.query(Task).filter_by(id=task_id).first()
    
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    db.delete(task)
    db.commit()
    
    return jsonify({'message': 'Task deleted successfully'}), 200


# ============ SETTINGS ROUTES ============

@api.route('/settings', methods=['GET'])
def get_settings():
    """Get application settings"""
    db: Session = request.db_session
    settings = db.query(Settings).first()
    
    # Create default settings if none exist
    if not settings:
        settings = Settings(task_cap=15, duration_units='minutes')
        db.add(settings)
        db.commit()
        db.refresh(settings)
    
    return jsonify(settings.to_dict())


@api.route('/settings', methods=['PUT'])
def update_settings():
    """Update application settings"""
    db: Session = request.db_session
    settings = db.query(Settings).first()
    
    # Create settings if they don't exist
    if not settings:
        settings = Settings()
        db.add(settings)
    
    data = request.get_json()
    
    if 'taskCap' in data:
        settings.task_cap = data['taskCap']
    if 'durationUnits' in data:
        settings.duration_units = data['durationUnits']
    
    db.commit()
    db.refresh(settings)
    
    return jsonify(settings.to_dict())
