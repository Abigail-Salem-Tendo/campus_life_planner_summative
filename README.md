# Campus Life Planner
   
**Purpose**

The Campus Life Planner helps students organize their academic and social life by tracking tasks, events, and goals in one place.
Users can add, edit, and search through their activities using regex-powered filters, visualize progress in a dashboard,
and manage their productivity through accessible, responsive interfaces.

**Planned Features**
- Add, edit, delete tasks and events
- Sort and search tasks using regex patterns
- Dashboard with weekly trend chart and total tasks completed
- Local storage(auto-save)
- Settings for time units (minutes ↔ hours)
- Responsive layout for mobile and desktop

**The Data Model**
This is an example of how the data would look like

Each record will have an ID, a title, duration, due date,
a timestamp and date of when each task was created and updated.
```
{
"id": "task_001",
"title": "Attend AI Club meeting",
"duration": 90,
"tag": "Extracurricular",
"dueDate": "2025-10-09",
"completed: false
"createdAt": "2025-10-07T08:00:00Z",
"updatedAt": "2025-10-07T08:00:00Z"
}
```

**Accessibility Plan**

***Goals***

- Use proper semantic HTML tags to structure my pages, helping assistive technologies navigate content correctly.
- Make sure interactive elements are usable with the keyboard
- Use aria-live for status updates

***Installation & Setup***
1. Clone the repository:

```angular2html
https://github.com/Abigail-Salem-Tendo/campus_life_planner_summative.git
```

2. Open the index.html in a browser

3. No Additional server is required since this project is plain HTML, CSS, and JavaScript


***Usage***
- Navigate the app using keyboard or mouse
- Add a new task via the Add New form
- Sort and search tasks on the All Tasks page
- Check Dashboard statistics


***Demo***
**Demo Video:** 