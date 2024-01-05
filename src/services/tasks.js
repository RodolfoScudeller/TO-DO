const moment = require('moment');
const { Tasks } = require('../models');
const responseMessages = require('../utils/responsesMessages');
const calcOffset = require('../utils/calcOffset');

class TaskServices {
  constructor({
    id,
    title,
    description,
    createdAt,
    updatedAt,
    endDate,
    status,
    priority,
    active,
    owner,
  }) {
    if (title === null || description === null || endDate === null || status === null || priority === null || active === null || owner === null || title === undefined || description === undefined || endDate === undefined || status === undefined || priority === undefined || active === undefined || owner === undefined) {
      throw new Error(responseMessages.error.requiredField);
    }

    this.id = null || id;
    this.title = title;
    this.description = description;
    this.createdAt = moment().format('YYYY-MM-DD HH:mm:SS');
    this.updatedAt = moment().format('YYYY-MM-DD HH:mm:SS');
    this.endDate = moment(endDate).format('YYYY-MM-DD HH:mm:SS');
    this.status = status;
    this.priority = priority;
    this.active = active;
    this.owner = owner;
  }

  static async getTasks(page) {
    const pageSize = 3;
    const offset = calcOffset(page, pageSize);
    const data = await Tasks.findAll(
      {
        where: { active: true },
        limit: pageSize,
        offset,
      },
    );
    const count = await Tasks.count({ where: { active: true } });
    return { data, count, _meta: { limit: pageSize, offset } };
  }

  static async getTasksById(id) {
    const task = await Tasks.findOne({ where: { active: true, id } });

    if (task !== null) {
      return task;
    } throw Error(responseMessages.error.taskNotFound);
  }

  static async createTask(task) {
    const tasks = new TaskServices(task);

    return Tasks.create(tasks);
  }

  static async updateTask(taskId, fields) {
    const task = await Tasks.findOne({ where: { active: true, id: taskId } });

    if (!task) {
      throw Error(responseMessages.error.taskNotFound);
    }

    Object.keys(fields).forEach((key) => {
      if (fields[key] !== undefined) {
        task[key] = fields[key];
      }
    });
    task.updatedAt = moment().format('YYYY-MM-DD HH:mm:SS');

    return task.save();
  }

  static async deleteTask(taskId) {
    const task = await Tasks.findOne({ where: { active: true, id: taskId } });

    if (!task) {
      throw Error(responseMessages.error.taskNotFound);
    }

    task.active = false;
    task.updatedAt = moment().format('YYYY-MM-DD HH:mm:SS');

    return task.save();
  }
}

module.exports = TaskServices;
