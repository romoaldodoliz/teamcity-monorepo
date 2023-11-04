const request = require('supertest');
const { app, server } = require('./index'); // Import your Express app and server

describe('Task Manager API', () =>
{
    // Initialize an array for testing tasks
    let testTasks = [];

    // Mock data for testing
    const mockTask = { id: 1, name: 'Test Task' };

    beforeAll(() =>
    {
        // Set up a mock for tasks or clear existing tasks
        testTasks = [mockTask];
    });

    it('should create a new task', async () =>
    {
        const response = await request(app)
            .post('/tasks')
            .send(mockTask);

        expect(response.statusCode).toBe(201);
    });

    it('should fetch tasks', async () =>
    {
        const response = await request(app).get('/tasks');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(testTasks);
    });

    it('should update an existing task', async () =>
    {
        const updatedTask = { id: 1, name: 'Updated Task' }; // Correct the name field

        const response = await request(app)
            .post('/tasks/update')
            .send(updatedTask);

        expect(response.statusCode).toBe(200);

        // Verify that the task was updated
        const updatedTaskIndex = testTasks.findIndex(task => task.id === updatedTask.id);
        expect(updatedTaskIndex).not.toBe(-1);
        expect(testTasks[updatedTaskIndex]).toEqual(updatedTask);
    });



    it('should return 404 when updating a non-existing task', async () =>
    {
        const nonExistingTask = { id: 999, name: 'Non-Existing Task' };

        const response = await request(app)
            .post('/tasks/update')
            .send(nonExistingTask);

        expect(response.statusCode).toBe(404);
    });
    it('should delete an existing task', async () =>
    {
        const taskToDelete = testTasks[0]; // Ensure that the task to delete exists in the test data

        const response = await request(app)
            .post('/tasks/delete')
            .send({ id: taskToDelete.id });

        expect(response.statusCode).toBe(200);

        // Verify that the task was deleted
        const deletedTaskIndex = testTasks.findIndex(task => task.id === taskToDelete.id);
        expect(deletedTaskIndex).toBe(-1); // Task should be deleted
    });


    it('should return 404 when deleting a non-existing task', async () =>
    {
        const nonExistingTaskId = 999;

        const response = await request(app)
            .post('/tasks/delete')
            .send({ id: nonExistingTaskId });

        expect(response.statusCode).toBe(404);
    });

    afterAll((done) =>
    {
        // Close the server after all tests are complete
        server.close(done);
    });
});
