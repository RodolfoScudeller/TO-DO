const express = require('express');
const TasksController = require('../controller/tasks');

const router = express.Router();

router.get('/tasks', TasksController.getTasks)
  .get('/tasks/:id', TasksController.getTasksById)
  .post('/tasks', TasksController.createTask)
  .put('/tasks/:id', TasksController.updateTask)
  .delete('/tasks/:id', TasksController.deleteTask);

module.exports = router;
