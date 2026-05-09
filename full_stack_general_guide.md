# 📘 General Guide: Building a Full-Stack Project & Connecting Frontend to Backend

This guide provides a universal step-by-step blueprint for creating a full-stack web application using **HTML/CSS/JS (Frontend)** and **Node.js/Express/MySQL (Backend)**. You can reuse this workflow for almost any project!

---

## 🏗️ Phase 1: Project Setup & Structure

Always start by organizing your folders. This keeps your code clean.

### Step 1: Create folders
Open your terminal and create the main project folder, then navigate into it:
```powershell
mkdir my-new-project
cd my-new-project
```

### Step 2: Create Frontend and Backend folders
```powershell
mkdir frontend
mkdir backend
```

---

## ⚙️ Phase 2: Backend Development (Node.js + Express)

### Step 3: Initialize Node.js
Navigate into the `backend` folder and create a `package.json` file:
```powershell
cd backend
npm init -y
```

### Step 4: Install essential packages
Install the core packages needed for a basic API:
```powershell
npm install express cors dotenv
```
*   **express**: To build the server and API routes.
*   **cors**: To allow your frontend to talk to your backend (Crucial!).
*   **dotenv**: To store secret keys and database passwords safely.

### Step 5: Install development tools (Optional but recommended)
```powershell
npm install -D nodemon
```
*   **nodemon**: Automatically restarts your server when you save code changes.

### Step 6: Create the basic server (`server.js`)
Create a file named `server.js` in the `backend` folder and add this starter code:
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows frontend to connect
app.use(express.json()); // Allows server to read JSON data from frontend

// Basic Route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

## 🗄️ Phase 3: Database Integration (MySQL Example)

If your project needs a database, follow these steps.

### Step 7: Install Database Driver
```powershell
npm install mysql2
```

### Step 8: Create Database Connection (`db.js`)
Create a `db.js` file to connect to MySQL:
```javascript
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME
});

module.exports = pool.promise();
```

### Step 9: Create Environment Variables (`.env`)
Create a `.env` file to store your credentials:
```text
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=your_database_name
```

---

## 🎨 Phase 4: Frontend Development & Connection

### Step 10: Create Frontend Files
In the `frontend` folder, create:
*   `index.html`
*   `style.css`
*   `script.js`

### Step 11: Connect Frontend to Backend using `fetch`
In your `script.js`, use the `fetch()` API to talk to your backend. Here is the standard template:

#### 📥 Example: GET Data (Fetching data to display)
```javascript
const API_URL = 'http://localhost:5000';

async function getData() {
  try {
    const response = await fetch(`${API_URL}/`);
    const data = await response.text(); // or .json() if backend sends JSON
    console.log(data); // Will log "API is working!"
  } catch (error) {
    console.error('Error connecting to backend:', error);
  }
}

getData();
```

#### 📤 Example: POST Data (Sending form data to backend)
```javascript
async function sendData(userData) {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Tells backend we are sending JSON
      },
      body: JSON.stringify(userData) // Converts JS object to JSON string
    });

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 🚀 Phase 5: How to Run the Project

### To Run Backend:
1.  Open terminal in the `backend` folder.
2.  Run: `node server.js` (or `npm run dev` if you set up nodemon).

### To Run Frontend:
1.  Open `frontend/index.html` directly in your browser or use VS Code "Live Server".

---

## 💡 Pro-Tips for any Full-Stack Project
1.  **CORS Error?** If your frontend cannot talk to your backend, make sure you added `app.use(cors())` in `server.js`.
2.  **JSON Body Parser:** If `req.body` is empty in your backend, make sure you added `app.use(express.json())` in `server.js`.
3.  **Async/Await:** Always use `async/await` for database queries and fetch requests to prevent your code from freezing.
