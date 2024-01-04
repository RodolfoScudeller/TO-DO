const {
  describe, expect, jest, it, beforeEach,
} = require('@jest/globals');

const moment = require('moment');
const Task = require('../services/tasks');
const TaskServices = require('../services/tasks');
const responseMessages = require('../utils/responsesMessages');

describe('Testing Tasks Services', () => {
  const mockTaskData = {
    title: 'test object',
    description: 'testing object',
    endDate: '2024-01-30 21:00:00',
    status: 'doing',
    priority: 'high',
    owner: 'Tester',
    active: true,
  };
  const mockTaskDataUpdate = {
    status: 'done',
    title: 'updated task',
    description: 'testing updateTask',
    endDate: '2024-01-30 20:00:00',
    owner: 'TesterMock',
    priority: 'medium',
    active: true,
  };
  let idTask;

  it('Should instance a new tasks', () => {
    const task = new Task(mockTaskData);
    expect(task).toEqual(expect.objectContaining(mockTaskData));
  });

  it('Should throw an error by instancing a new task with empty required fields', async () => {
    const mockTaskDataError = { ...mockTaskData };
    delete mockTaskDataError.status;
    const taskTeste = () => new Task(mockTaskDataError);

    expect(taskTeste).toThrowError('Required Field!');
  });

  it('Should create a task on DB', async () => {
    console.log(mockTaskData);
    const resultCreate = await TaskServices.createTask(mockTaskData);

    idTask = resultCreate.id;

    expect(resultCreate).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        endDate: expect.any(Date),
        status: expect.any(String),
        priority: expect.any(String),
        active: expect.any(Boolean),
        owner: expect.any(String),
      }),
    );
  });

  it('Should return all the tasks', async () => {
    const result = await TaskServices.getTasks();
    expect(result).toEqual(expect.objectContaining({ data: expect.anything() }));
  });

  it('Should return a specific tasks', async () => {
    const result = await TaskServices.getTasksById(idTask);
    expect(result).toEqual(expect.objectContaining({
      id: idTask,
      title: expect.any(String),
      description: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      endDate: expect.any(Date),
      status: expect.any(String),
      priority: expect.any(String),
      active: expect.any(Boolean),
      owner: expect.any(String),
    }));
  });

  it('Should update a task on a DB', async () => {
    await TaskServices.updateTask(idTask, mockTaskDataUpdate);

    const result = await TaskServices.getTasksById(idTask);

    expect(result.title).toEqual(mockTaskDataUpdate.title);
    expect(result.description).toEqual(mockTaskDataUpdate.description);
    expect(result.status).toEqual(mockTaskDataUpdate.status);
    expect(result.priority).toEqual(mockTaskDataUpdate.priority);
    expect(result.active).toEqual(mockTaskDataUpdate.active);
    expect(result.owner).toEqual(mockTaskDataUpdate.owner);
    expect(result.endDate).toEqual(moment(mockTaskDataUpdate.endDate).toDate());
  });
  it('Shouldnt update a task if fields are empty', () => {
    const task = {};
    const fields = {};

    TaskServices.updateTask(idTask, fields);

    expect(task).toEqual({});
  });

  it('Should only update the passed fields', async () => {
    const fields = { title: 'New Task', description: 'Task description' };
    const task = mockTaskDataUpdate;
    task.title = fields.title;
    task.description = fields.description;

    await TaskServices.updateTask(idTask, fields);
    const result = await TaskServices.getTasksById(idTask);

    expect(result.title).toEqual(task.title);
    expect(result.description).toEqual(task.description);
    expect(result.status).toEqual(task.status);
    expect(result.priority).toEqual(task.priority);
    expect(result.active).toEqual(task.active);
    expect(result.owner).toEqual(task.owner);
    expect(result.endDate).toEqual(moment(task.endDate).toDate());
  });

  it('Should ignore `undefined` fields', async () => {
    const fields = { title: undefined, description: 'Task description' };
    const task = mockTaskDataUpdate;
    task.description = fields.description;

    TaskServices.updateTask(idTask, fields);

    await TaskServices.updateTask(idTask, fields);
    const result = await TaskServices.getTasksById(idTask);

    expect(result.title).toEqual(task.title);
    expect(result.description).toEqual(task.description);
  });

  it('Should delete a task on DB', async () => {
    await TaskServices.deleteTask(idTask);

    await expect(TaskServices.getTasksById(idTask)).rejects.toThrowError(responseMessages.error.taskNotFound);
  });
  it('Should throw an Error by updating a inexistent task', async () => {
    await expect(TaskServices.updateTask(idTask, mockTaskDataUpdate)).rejects.toThrowError(responseMessages.error.taskNotFound);
  });
  it('Should throw an Error by deleting a inexistent task', async () => {
    await expect(TaskServices.deleteTask(idTask)).rejects.toThrowError(responseMessages.error.taskNotFound);
  });
  it('Should return offset with same value of limit', async () => {
    const teste = await TaskServices.getTasks(0);

    expect(teste._meta.offset).toBe(0);
  });
});
