"""
Campus Life Planner - Flask Backend Application
"""
from flask import Flask, g, request
from flask_cors import CORS
from config import Config
from models import init_db, get_session
from routes import api
import os


def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Enable CORS for frontend communication
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Initialize database
    database_dir = os.path.dirname(app.config['DATABASE_PATH'])
    os.makedirs(database_dir, exist_ok=True)
    
    engine = init_db(app.config['SQLALCHEMY_DATABASE_URI'])
    app.engine = engine
    
    # Register blueprints
    app.register_blueprint(api)
    
    # Database session management
    @app.before_request
    def before_request():
        """Create database session before each request"""
        g.db_session = get_session(app.engine)
        request.db_session = g.db_session
    
    @app.after_request
    def after_request(response):
        """Close database session after each request"""
        if hasattr(g, 'db_session'):
            g.db_session.close()
        return response
    
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        """Clean up database session"""
        if hasattr(g, 'db_session'):
            g.db_session.close()
    
    # Health check endpoint
    @app.route('/health')
    def health():
        """Health check endpoint"""
        return {'status': 'healthy', 'message': 'Campus Life Planner API is running'}
    
    return app


if __name__ == '__main__':
    app = create_app()
    print("🚀 Starting Campus Life Planner API Server...")
    print(f"📁 Database: {app.config['DATABASE_PATH']}")
    print("🌐 Server running on http://localhost:5000")
    print("\nAvailable endpoints:")
    print("  GET    /health              - Health check")
    print("  GET    /api/tasks           - Get all tasks")
    print("  POST   /api/tasks           - Create task")
    print("  GET    /api/tasks/<id>      - Get specific task")
    print("  PUT    /api/tasks/<id>      - Update task")
    print("  DELETE /api/tasks/<id>      - Delete task")
    print("  GET    /api/settings        - Get settings")
    print("  PUT    /api/settings        - Update settings")
    print("\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
