const db = require('../db');

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id]);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
      [req.user.id, title, description || '']
    );

    res.status(201).json({
      id: result.insertId,
      user_id: req.user.id,
      title,
      description: description || '',
      completed: 0
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    // Check if task exists and belongs to user
    const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, req.user.id]);
    
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Update the task
    await db.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title || tasks[0].title, description !== undefined ? description : tasks[0].description, completed !== undefined ? completed : tasks[0].completed, id]
    );

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if task exists and belongs to user
    const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, req.user.id]);
    
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Delete the task
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
