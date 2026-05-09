# 🚀 Hackathon Full-Stack Project

A beginner-friendly, complete full-stack web application with a modern UI, backend connection, MySQL database integration, authentication system, and deployment-ready configuration.

---

## 📁 Folder Structure

```text
project/
│
├── frontend/               # Client-side files
│   ├── index.html         # Registration Page (Entry point)
│   ├── login.html         # Login Page
│   ├── dashboard.html     # Protected Dashboard Page
│   ├── style.css         # Modern Glassmorphism Styling
│   └── script.js         # Frontend Logic & API Fetching
│
├── backend/                # Server-side files
│   ├── server.js         # Main entry point for Express
│   ├── package.json      # Dependencies & scripts
│   ├── .env               # Environment variables (secret)
│   ├── db.js             # MySQL Connection pool
│   ├── routes/           # API Route definitions
│   │   ├── auth.js       # Auth routes (Login/Register)
│   │   └── tasks.js      # Task routes (CRUD)
│   └── controllers/      # Route handling logic
│       ├── authController.js # Auth logic
│       └── taskController.js # Task CRUD logic
│
└── README.md               # Documentation (This file)
```

---

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Auth:** JWT (JSON Web Tokens), bcryptjs (Password hashing)

---

## 🚀 Step-by-Step Setup Guide

### STEP 1 → Install Node.js
If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org/). This will also install `npm` (Node Package Manager).

### STEP 2 → Install MySQL
Download and install MySQL Server or use a tool like **XAMPP** or **Laragon** which includes MySQL.

### STEP 3 → Create Database
Open your MySQL terminal or a tool like phpMyAdmin/MySQL Workbench and run the following commands:

```sql
-- 1. Create the database
CREATE DATABASE IF NOT EXISTS hackathon_db;
USE hackathon_db;

-- 2. Create Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Tasks table (for CRUD operations)
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Insert sample data (Optional)
-- Note: Password here is 'password123' hashed with bcrypt
INSERT INTO users (username, email, password) VALUES 
('demo_user', 'demo@example.com', '$2a$10$X7h6n9n9p9p9p9p9p9p9p.p9p9p9p9p9p9p9p9p9p9p9p9p9');
```

### STEP 4 → Install Packages
Open your terminal, navigate to the `backend` directory, and install dependencies:

```powershell
cd backend
npm install
```

To run with auto-reload (for development):
```powershell
npm install -D nodemon
```

### STEP 5 → Run Backend
Create a `.env` file in the `backend` folder (one has been created for you) and update your MySQL credentials.
Then start the server:

```powershell
# Inside backend directory
npm run dev
# or
node server.js
```
The server should start on `http://localhost:5000`.

### STEP 6 → Run Frontend
You can open `frontend/index.html` directly in your browser or use an extension like "Live Server" in VS Code.

### STEP 7 → Test APIs
You can use tools like **Postman** or **Thunder Client** to test the APIs without the frontend.
- **POST** `http://localhost:5000/api/auth/register`
- **POST** `http://localhost:5000/api/auth/login`
- **GET** `http://localhost:5000/api/tasks` (Requires Authorization header)

### STEP 8 → Deploy Project
- **Frontend:** Push your code to GitHub and import the project to **Vercel**. It will deploy automatically.
- **Backend:** You can use **Railway** or **Render**. Connect your GitHub repository, add your environment variables (from `.env`), and deploy.
- **Database:** You can use a hosted MySQL database on Railway or a service like **Aiven**.

---

## 🔌 How Frontend Connects to Backend

In `frontend/script.js`, we define the `API_URL`:
```javascript
const API_URL = 'http://localhost:5000/api';
```
When you make a fetch request (e.g., to login):
```javascript
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```
The frontend sends a request to the backend. The backend processes the request (queries the database) and sends back a response (e.g., a JWT token or success message).

---

## 🔑 Authentication System

1. **Sign Up:** Frontend sends username, email, and password. Backend hashes the password and stores it in MySQL.
2. **Sign In:** Frontend sends email and password. Backend verifies the password. If correct, it generates a JWT token and sends it back.
3. **Storage:** Frontend stores the token in `localStorage`.
4. **Protected Routes:** For every request to `/api/tasks`, the frontend sends the token in the `Authorization` header: `Bearer <token>`. The backend verifies this token before processing the request.

---

## 📝 Backend API Examples

### Register
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": { "id": 1, "username": "testuser", "email": "test@example.com" }
  }
  ```

---

## 💡 Tips for Hackathon

- **Keep it simple:** Don't add too many features. Focus on making the core features work perfectly.
- **UI Matters:** A good design can win hackathons. The UI provided uses Glassmorphism and modern gradients to make it stand out.
- **Error Handling:** Always handle errors gracefully on both frontend and backend to prevent the app from crashing during the demo.
