# 🏆 Hackathon Guide: How Frontend & Backend Connect

This guide explains exactly how the Frontend and Backend talk to each other, who decides the address first, and how you can change it. Use this to understand your code and explain it to the hackathon judges!

---

## 👑 1. Who Decides First? (The Boss is the Backend)

In full-stack development, the **Backend decides first**. 
The backend is like a shop. The shop owner decides where the shop will be located (the address) and what services they offer. The frontend is the customer who must find the shop at that specific address.

*   **Rule:** You must configure the Backend address first, and then tell the Frontend where to look.

---

## 📍 2. How to know where they work

### A. Where does the Backend work?
You can find the address of your backend by looking at the file **`backend/server.js`**.
*   **The Port:** Look for `const PORT = process.env.PORT || 5000;`. This tells you the backend is running on port **5000**.
*   **The Folder (Route):** Look for `app.use('/api/auth', ...)`. This tells you the path starts with **`/api`**.
*   **Combined Address:** `http://localhost:5000/api`

### B. Where does the Frontend work?
The frontend works in your **Browser**. You know where it works by looking at the address bar at the top of your browser:
*   It will usually look like: `http://127.0.0.1:5500/frontend/index.html` (if using Live Server) or `file:///C:/...` (if opened directly).

---

## 🌉 3. How they connect with each other

They connect using the **Fetch API** in JavaScript. 
Because the Backend decided its address is `http://localhost:5000/api`, we must put that **exact same address** in the Frontend file (`frontend/script.js`).

Look at line 3 in `script.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```
When you click a button on the frontend, it uses this `API_URL` to send data to the backend.

---

## 🛠️ 4. How to change the address (With Examples)

If you want to change the address during the hackathon to show you understand it, here are two examples of how to do it.

### 🔄 Example 1: Changing the Port (From 5000 to 7000)

**Step 1: Change the Backend**
Open `backend/server.js` and change the port on line 6:
```javascript
// Old code: const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 7000; // Changed to 7000
```

**Step 2: Change the Frontend**
Open `frontend/script.js` and change the API URL on line 3:
```javascript
// Old code: const API_URL = 'http://localhost:5000/api';
const API_URL = 'http://localhost:7000/api'; // Changed to 7000 to match!
```

---

### 🔄 Example 2: Changing the Route Name (From `/api` to `/v1`)

**Step 1: Change the Backend**
Open `backend/server.js` and change line 17 and 18:
```javascript
// Old code: app.use('/api/auth', authRoutes);
app.use('/v1/auth', authRoutes); // Changed /api to /v1

// Old code: app.use('/api/tasks', taskRoutes);
app.use('/v1/tasks', taskRoutes); // Changed /api to /v1
```

**Step 2: Change the Frontend**
Open `frontend/script.js` and change the API URL on line 3:
```javascript
// Old code: const API_URL = 'http://localhost:5000/api';
const API_URL = 'http://localhost:5000/v1'; // Changed /api to /v1 to match!
```

---

## 🎯 Summary for Hackathon Presentation
If the judges ask how they connect, you can say:
> *"The backend starts a server on port 5000 using Express. We defined our routes with the `/api` prefix. On the frontend, we stored this address in a variable called `API_URL`. When a user submits a form, the frontend makes an asynchronous HTTP request using `fetch()` to that specific backend URL to save or retrieve data from the MySQL database."*
