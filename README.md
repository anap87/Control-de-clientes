# Sports Scholarship Agency – Client Management System

This project is a web-based client management system designed for a sports scholarship agency.  
It allows administrators to organize, track, and manage student-athletes throughout the scholarship process.

The system was built as a practical learning project focused on real-world application, data organization, and user interaction.

---

## Features

- Secure navigation flow (login → dashboard → client profile)
- Client dashboard with:
  - Name, sport, and current status
  - Status editing (In progress, Accepted, Pending)
  - Automatic sorting by status priority
  - Visual indicators (color-coded buttons)
- Individual client profile page
- Persistent notes per client (saved even after refresh)
- Add new clients
- Delete clients with confirmation
- Data persistence using `localStorage`

---

## Project Purpose

The goal of this project was to simulate a real internal system used by a sports scholarship agency to:

- Track applicants
- Monitor progress and outcomes
- Store reminders and follow-ups
- Practice CRUD operations (Create, Read, Update, Delete)

---

## Important Note About Authentication

> The login system is **not yet authenticated**.

Currently:
- No real authentication or user validation is enforced.

Planned future improvements include:
- Firebase Authentication
- Secure data storage

---

## Technologies Used

- HTML
- CSS
- JavaScript 
- Browser `localStorage` for data persistence
- GitHub Pages for deployment

---

## Project Structure

/project-root
│
├── index.html
├── dashboard.html
├── client.html
├── style.css
├── app.js
├── clients.json
└── README.md


---

## 🧪 How to Use

1. Open the project in a browser
2. Log in (no credentials required at this stage)
3. View the dashboard to manage clients
4. Update status, add notes, add or delete clients
5. Refresh the page — data remains saved

---

## Author

**Ana Ortega**  
Student & Developer  
Project created for academic portfolio use.
