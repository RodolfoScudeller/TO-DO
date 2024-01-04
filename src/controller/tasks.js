const TasksService = require('../services/tasks');
const responseMessages = require('../utils/responsesMessages');

class TasksController {
  static getTasks = async (req, res) => {
    const page = req.query.page || 0;

    try {
      const result = await TasksService.getTasks(page);

      return res.status(200).json({
        sucess: true,
        message: responseMessages.sucess.taskRetrieved,
        data: result.data,
        _meta: {
          count: result.count,
          limit: result.limit,
          offset: result.offset,
        },
      });
    } catch (err) {
      return res.status(404).json({
        sucess: false,
        message: err.message,
      });
    }
  };

  static getTasksById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await TasksService.getTasksById(id);

      return res.status(200).json({
        sucess: true,
        message: responseMessages.sucess.taskRetrieved,
        data: result,
      });
    } catch (err) {
      if (err.message === responseMessages.error.taskNotFound) {
        return res.status(404).json({
          sucess: false,
          message: err.message,
        });
      }
      return res.status(500).json({
        sucess: false,
        message: err.message,
      });
    }
  };

  static createTask = async (req, res) => {
    try {
      const { body } = req;
      const result = await TasksService.createTask(body);

      return res.status(201).json(
        {
          sucess: true,
          message: responseMessages.sucess.taskCreated,
          data: result,
        },
      );
    } catch (err) {
      return res.status(500).json({
        sucess: false,
        message: err.message,
      });
    }
  };

  static updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const result = await TasksService.updateTask(id, body);

      return res.status(200).json({
        sucess: true,
        message: responseMessages.sucess.taskUpdated,
        data: result,
      });
    } catch (err) {
      if (err.message === responseMessages.error.taskNotFound) {
        return res.status(404).json({
          sucess: false,
          message: err.message,
        });
      }
      return res.status(500).json({
        sucess: false,
        message: err.message,
      });
    }
  };

  static deleteTask = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await TasksService.deleteTask(id);

      return res.status(200).json({
        sucess: true,
        message: responseMessages.sucess.taskDeleted,
        data: result,
      });
    } catch (err) {
      if (err.message === responseMessages.error.taskNotFound) {
        return res.status(404).json({
          sucess: false,
          message: err.message,
        });
      }
      return res.status(500).json({
        sucess: false,
        message: err.message,
      });
    }
  };
}

module.exports = TasksController;
