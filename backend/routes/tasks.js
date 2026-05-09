const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// All routes here are protected
router.use(auth);

// GET /api/tasks
router.get('/', taskController.getTasks);

// POST /api/tasks
router.post('/', taskController.createTask);

// PUT /api/tasks/:id
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', taskController.deleteTask);

module.exports = router;
