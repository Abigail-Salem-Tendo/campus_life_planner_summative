# 🚀 Quick Start Guide - Campus Life Planner

## How to Run the App

Follow these steps to get your Campus Life Planner running:

### Step 1: Install Dependencies

Open a terminal in the project root and run:

```bash
cd backend
pip install -r requirements.txt
```

This installs Flask, Flask-CORS, SQLAlchemy, and other required packages.

### Step 2: Initialize the Database

Still in the `backend` directory, run:

```bash
python init_db.py
```

This will:
- Create the SQLite database at `database/campus_planner.db`
- Set up the tasks and settings tables
- Load 12 sample tasks

### Step 3: Start the Flask Server

Run the Flask application:

```bash
python app.py
```

You should see output like:
```
🚀 Starting Campus Life Planner API Server...
📁 Database: D:\Dev\schProjects\campus_life_planner_summative\database\campus_planner.db
🌐 Server running on http://localhost:5000
```

**Keep this terminal window open!**

### Step 4: Open the App in Your Browser

Open your web browser and go to:

```
http://localhost:5000
```

This will load the dashboard page. You can now:
- View your tasks on the Dashboard
- Click "All Tasks" to see all tasks
- Click "Add New" to create new tasks
- Click "Settings" to configure preferences
- Click "About" to learn more

### 🔗 Available Pages

- **Dashboard** - http://localhost:5000/
- **All Tasks** - http://localhost:5000/tasks.html
- **Add New Task** - http://localhost:5000/addForm.html
- **Settings** - http://localhost:5000/settings.html
- **About** - http://localhost:5000/about.html

---

## 🛑 To Stop the Server

Press `Ctrl + C` in the terminal where Flask is running.

---

## 🐛 Troubleshooting

**Problem: "pip: command not found"**
- Try: `python -m pip install -r requirements.txt`

**Problem: Port 5000 already in use**
- Edit `backend/app.py` line 84 and change the port:
  ```python
  app.run(debug=True, host='0.0.0.0', port=5001)
  ```
- Then access the app at http://localhost:5001

**Problem: Database errors**
- Delete `database/campus_planner.db`
- Re-run: `python init_db.py`

**Problem: Pages not loading/styling broken**
- Make sure you're accessing through http://localhost:5000
- Check that Flask server is running
- Look for errors in the terminal

---

## 📝 What Changed

The app has been updated with:
- ✅ Simplified CSS (removed shadows and diamond designs)
- ✅ Fixed footer positioning on all pages
- ✅ Consistent styling across all pages
- ✅ Flask routes to serve HTML pages properly
- ✅ Fixed static file paths for CSS and JavaScript

Enjoy your Campus Life Planner! 🎓
