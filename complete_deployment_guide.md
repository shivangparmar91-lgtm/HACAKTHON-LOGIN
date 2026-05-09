# 🚀 Complete Deployment Guide: Frontend + Backend + Database

This guide explains step-by-step how we put your full-stack project on the internet. Keep this for your hackathon to understand the deployment flow!

---

## 🗄️ Step 1: The Database (Aiven.io)
Since your local MySQL doesn't work on the internet, we use a cloud database.

1.  Go to **Aiven.io** and create a free account.
2.  Create a **MySQL** service.
3.  Aiven gives you the credentials (Host, User, Password). We need these for Step 2.

---

## ⚙️ Step 2: The Backend (Render.com)
We host the Node.js server on Render.

1.  Sign up on **Render.com** using GitHub.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Settings:**
    *   **Root Directory:** `backend`
    *   **Start Command:** `node server.js`
5.  **Environment Variables:** Add your Aiven database credentials here (`DB_HOST`, `DB_USER`, `DB_PASSWORD`).
6.  Render gives you a live backend link (e.g., `https://login-form-uqg4.onrender.com`).

---

## 🎨 Step 3: The Frontend (Vercel.com)
We host the HTML, CSS, and JS files on Vercel.

1.  Sign up on **Vercel.com** using GitHub.
2.  Click **Add New** -> **Project**.
3.  Import your GitHub repository.
4.  **Settings:**
    *   Set the **Root Directory** to `frontend`.
5.  Click **Deploy**. Vercel gives you your live website link!

---

## 🔗 Step 4: Connecting Them & Pushing Code (Crucial Step!)
Right now, the frontend on Vercel doesn't know the address of the backend on Render. We must update the code and push it to GitHub.

### 1. Update the Code
Open `frontend/script.js` and update the `API_URL` with your Render link. **Make sure to include `/api` at the end!**

```javascript
const API_URL = 'https://login-form-uqg4.onrender.com/api';
```

### 2. Push Code using Git (Terminal)
After saving the file, you must push this change to GitHub so Vercel can see it. Open your terminal in the project folder and run these 3 commands:

```powershell
# 1. Stage all changes
git add .

# 2. Commit the changes with a message
git commit -m "Fix API URL by adding /api"

# 3. Push to GitHub
git push
```

### 🎉 Done!
Once you push, Vercel automatically detects the change, updates your website, and your frontend will now successfully talk to your live backend!
