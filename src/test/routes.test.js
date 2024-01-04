const {
  afterEach, beforeEach, expect, jest, done, describe,
} = require('@jest/globals');
const request = require('supertest');
const { app, startServer } = require('../server/server');

let server;
let idTask;

beforeAll(async () => {
  server = await startServer();
});
afterAll((done) => {
  if (server) {
    server.close(() => {
      done();
    });
  } else {
    done();
  }
});
describe('POST - Tasks', () => {
  it('Should create a task', async () => {
    const result = await request(app).post('/tasks').send({
      title: 'teste create',
      description: 'testing creation by test',
      endDate: '2024-01-31T00:00:00.000Z',
      status: 'doing',
      priority: 'high',
      owner: 'Tester Lola',
      active: true,
    }).expect(201);
    idTask = result.body.data.id;
  });
});
describe('GET - Tasks', () => {
  it('Should return an array of tasks', async () => {
    const result = await request(app).get('/tasks').expect(200);

    expect(result.body.sucess).toBe(true);
    expect(result.body.message).toBe('Tasks retrieved successfully!');
    expect(result.body).toHaveProperty('data');
    expect(result.body.data[0]).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      description: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      endDate: expect.any(String),
      status: expect.any(String),
      priority: expect.any(String),
      active: expect.any(Boolean),
      owner: expect.any(String),
    });
  });
});
describe('GET - Tasks/id', () => {
  it('Should return a task', async () => {
    const result = await request(app).get(`/tasks/${idTask}`).expect(200);

    expect(result.body.sucess).toBe(true);
    expect(result.body.message).toBe('Tasks retrieved successfully!');
    expect(result.body).toHaveProperty('data');
    expect(result.body.data).toEqual({
      id: idTask,
      title: 'teste create',
      description: 'testing creation by test',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      endDate: '2024-01-31T00:00:00.000Z',
      status: 'doing',
      priority: 'high',
      active: true,
      owner: 'Tester Lola',
    });
  });
});
describe('PUT - Tasks/id', () => {
  it('Should update a task', async () => {
    const result = await request(app).put(`/tasks/${idTask}`).send(
      { title: 'New Task', description: 'Task description' },
    ).expect(200);

    expect(result.body.sucess).toBe(true);
    expect(result.body.message).toBe('Task updated successfully!');
    expect(result.body).toHaveProperty('data');
    expect(result.body.data).toEqual({
      id: idTask,
      title: 'New Task',
      description: 'Task description',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      endDate: '2024-01-31T00:00:00.000Z',
      status: 'doing',
      priority: 'high',
      active: true,
      owner: 'Tester Lola',
    });
  });
});
describe('DELTE - Tasks', () => {
  it('Should delete a tasks', async () => {
    const result = await request(app).delete(`/tasks/${idTask}`).expect(200);

    expect(result.body.sucess).toBe(true);
    expect(result.body.message).toBe('Task deleted successfully!');
    expect(result.body).toHaveProperty('data');
    expect(result.body.data).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      description: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      endDate: expect.any(String),
      status: expect.any(String),
      priority: expect.any(String),
      active: expect.any(Boolean),
      owner: expect.any(String),
    });
  });
});
