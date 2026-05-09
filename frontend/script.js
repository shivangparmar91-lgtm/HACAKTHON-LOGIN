// API Base URL
// Change this to your deployed backend URL when deploying
const API_URL = 'https://hacakthon-login.onrender.com/api';

// Helper function to show alerts (could be improved with a custom modal)
function showAlert(message, type = 'info') {
  alert(message); // Simple alert for beginner friendliness
}

// Check authentication on protected pages
function checkAuth() {
  const token = localStorage.getItem('token');
  const isAuthPage = window.location.pathname.includes('login.html') ||
    window.location.pathname.includes('index.html') ||
    window.location.pathname === '/';

  if (!token && !isAuthPage) {
    // Not logged in and trying to access protected page
    window.location.href = 'login.html';
  } else if (token && isAuthPage) {
    // Logged in and trying to access login/register page
    window.location.href = 'dashboard.html';
  }
}

// Run auth check on load
checkAuth();

// ==========================================
// REGISTRATION LOGIC
// ==========================================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = document.getElementById('submitBtn');

    // Show loading state
    submitBtn.innerHTML = '<span class="spinner"></span> <span>Registering...</span>';
    submitBtn.disabled = true;

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        showAlert('Registration successful! Please log in.', 'success');
        window.location.href = 'login.html';
      } else {
        showAlert(data.message || 'Registration failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('Could not connect to the server.', 'error');
    } finally {
      // Reset button state
      submitBtn.innerHTML = '<span>Sign Up</span> <i class="fas fa-arrow-right"></i>';
      submitBtn.disabled = false;
    }
  });
}

// ==========================================
// LOGIN LOGIC
// ==========================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = document.getElementById('submitBtn');

    // Show loading state
    submitBtn.innerHTML = '<span class="spinner"></span> <span>Signing In...</span>';
    submitBtn.disabled = true;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user info to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.location.href = 'dashboard.html';
      } else {
        showAlert(data.message || 'Login failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('Could not connect to the server.', 'error');
    } finally {
      // Reset button state
      submitBtn.innerHTML = '<span>Sign In</span> <i class="fas fa-arrow-right"></i>';
      submitBtn.disabled = false;
    }
  });
}

// ==========================================
// DASHBOARD LOGIC
// ==========================================
const taskListContainer = document.getElementById('taskList');
if (taskListContainer) {
  // Populate user info
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    document.getElementById('usernameDisplay').textContent = user.username;
    document.getElementById('userEmailDisplay').textContent = user.email;
    document.getElementById('welcomeName').textContent = user.username;
    document.getElementById('userAvatar').textContent = user.username.charAt(0).toUpperCase();
  }

  // Logout Handler
  document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  });

  // Fetch and Render Tasks
  async function loadTasks() {
    const token = localStorage.getItem('token');
    const statusMsg = document.getElementById('taskStatusMsg');

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const tasks = await response.json();

      if (response.ok) {
        renderTasks(tasks);
        updateStats(tasks);
        statusMsg.textContent = 'All tasks loaded';
      } else {
        statusMsg.textContent = 'Error loading tasks';
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          window.location.href = 'login.html';
        }
      }
    } catch (error) {
      console.error('Error:', error);
      statusMsg.textContent = 'Server connection failed';
    }
  }

  // Render Tasks to DOM
  function renderTasks(tasks) {
    if (tasks.length === 0) {
      taskListContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-secondary); padding: 20px;">
          No tasks found. Add one on the right!
        </div>
      `;
      return;
    }

    taskListContainer.innerHTML = '';
    tasks.forEach(task => {
      const taskEl = document.createElement('div');
      taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;

      taskEl.innerHTML = `
        <div class="task-info">
          <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id}, ${task.completed})">
            <i class="fas fa-check" style="color: white;"></i>
          </div>
          <div class="task-text">
            <h4>${task.title}</h4>
            <p>${task.description || 'No description'}</p>
          </div>
        </div>
        <div class="task-actions">
          <button class="action-btn delete" onclick="deleteTask(${task.id})" title="Delete Task">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;

      taskListContainer.appendChild(taskEl);
    });
  }

  // Update Stats Cards
  function updateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasksCount').textContent = total;
    document.getElementById('completedTasksCount').textContent = completed;
    document.getElementById('pendingTasksCount').textContent = pending;
  }

  // Add Task Handler
  const addTaskForm = document.getElementById('addTaskForm');
  addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;
    const token = localStorage.getItem('token');
    const addBtn = document.getElementById('addTaskBtn');

    addBtn.innerHTML = '<span class="spinner"></span> <span>Adding...</span>';
    addBtn.disabled = true;

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      });

      if (response.ok) {
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDesc').value = '';
        loadTasks(); // Reload task list
      } else {
        showAlert('Failed to add task', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('Server error', 'error');
    } finally {
      addBtn.innerHTML = '<span>Add Task</span> <i class="fas fa-plus"></i>';
      addBtn.disabled = false;
    }
  });

  // Toggle Task Completion (Global scope for onclick)
  window.toggleTask = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: currentStatus ? 0 : 1 })
      });

      if (response.ok) {
        loadTasks();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete Task (Global scope for onclick)
  window.deleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        loadTasks();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Initial load
  loadTasks();
}
