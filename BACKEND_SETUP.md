# Backend Setup and Testing Guide

## ✅ Already Completed
- Directory structure created
- HTML/CSS/JS files reorganized
- Backend Python files created:
  - `requirements.txt` - Dependencies
  - `config.py` - Configuration
  - `models.py` - Database models
  - `routes.py` - API endpoints
  - `app.py` - Flask application
  - `init_db.py` - Database initialization
  - `seed.json` - Sample data

---

## 🚀 Next Steps to Get Backend Running

### Step 1: Install Python Dependencies

Open a terminal in the `backend/` directory and run:

```bash
cd backend
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- Flask-CORS (for frontend-backend communication)
- SQLAlchemy (database ORM)
- python-dateutil (date handling)
- python-dotenv (environment variables)

### Step 2: Initialize the Database

Run the database initialization script:

```bash
python init_db.py
```

This will:
- Create `database/campus_planner.db` (SQLite database file)
- Create the `tasks` and `settings` tables
- Load 12 sample tasks from `seed.json`
- Create default settings

You should see output like:
```
============================================================
Campus Life Planner - Database Initialization
============================================================

📁 Database location: D:\Dev\schProjects\campus_life_planner_summative\database\campus_planner.db
✅ Database tables created

📦 Loading 12 tasks from seed.json...
  ✓ Added: Submit JavaScript Assignment
  ✓ Added: Group meeting for design project
  ... (etc)
✅ Seed data loaded successfully!

✅ Default settings created

============================================================
📊 Database Summary:
   Total Tasks: 12
   Completed: 0
   Pending: 12
============================================================

🎉 Database initialization complete!
```

### Step 3: Start the Flask Server

Run the Flask application:

```bash
python app.py
```

You should see:
```
🚀 Starting Campus Life Planner API Server...
📁 Database: D:\Dev\schProjects\campus_life_planner_summative\database\campus_planner.db
🌐 Server running on http://localhost:5000

Available endpoints:
  GET    /health              - Health check
  GET    /api/tasks           - Get all tasks
  POST   /api/tasks           - Create task
  GET    /api/tasks/<id>      - Get specific task
  PUT    /api/tasks/<id>      - Update task
  DELETE /api/tasks/<id>      - Delete task
  GET    /api/settings        - Get settings
  PUT    /api/settings        - Update settings

 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
```

**Keep this terminal window open** - the server needs to run while you use the app.

---

## 🧪 Step 4: Test the Backend API

Open a **new terminal** and test the endpoints:

### Test 1: Health Check
```bash
curl http://localhost:5000/health
```
Expected: `{"status":"healthy","message":"Campus Life Planner API is running"}`

### Test 2: Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```
Expected: JSON array with 12 tasks

### Test 3: Get Settings
```bash
curl http://localhost:5000/api/settings
```
Expected: `{"taskCap":15,"durationUnits":"minutes"}`

### Test 4: Create a New Task (Optional)
```bash
curl -X POST http://localhost:5000/api/tasks -H "Content-Type: application/json" -d "{\"id\":\"test_task_001\",\"title\":\"Test Task\",\"dueDate\":\"2025-12-01\",\"duration\":60,\"tag\":\"Test\",\"completed\":false}"
```

---

## 📝 What Comes Next (After Backend Works)

Once the backend is running successfully, we'll:
1. Create `api.js` - Frontend module to communicate with backend
2. Update `storage.js` - Replace localStorage with API calls
3. Test the full application end-to-end

---

## 🐛 Troubleshooting

**Problem: "pip: command not found"**
- Make sure Python is installed: `python --version`
- Try `python -m pip install -r requirements.txt`

**Problem: Port 5000 already in use**
- Change port in `app.py` line 61: `app.run(debug=True, host='0.0.0.0', port=5001)`

**Problem: Module not found errors**
- Make sure you're in the `backend/` directory
- Re-run: `pip install -r requirements.txt`

**Problem: Database errors**
- Delete `database/campus_planner.db` 
- Re-run: `python init_db.py`

---

## 📂 File Structure Check

Your project should look like this:

```
campus_life_planner_summative/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── init_db.py
│   ├── models.py
│   ├── routes.py
│   ├── requirements.txt
│   └── seed.json
├── database/
│   └── campus_planner.db (created after init_db.py runs)
├── frontend/
│   ├── static/
│   │   ├── css/
│   │   │   └── main.css
│   │   └── js/
│   │       ├── addForm.js
│   │       ├── dashboard.js
│   │       ├── main.js
│   │       ├── search.js
│   │       ├── settings.js
│   │       ├── storage.js
│   │       ├── taskList.js
│   │       └── validators.js
│   └── templates/
│       ├── about.html
│       ├── addForm.html
│       ├── index.html
│       ├── settings.html
│       └── tasks.html
└── README.md
```
