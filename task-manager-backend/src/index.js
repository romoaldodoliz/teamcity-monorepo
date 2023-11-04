const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package and alias the v4 method as uuidv4
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let tasks = [];

app.post('/task/create', (req, res) =>
{
    const taskId = uuidv4(); // Generate a random UUID
    const task = { id: taskId, name: req.body.name };
    tasks.push(task);
    console.log(`Task created: ${JSON.stringify(task)}`);
    res.status(201).send(task);
});

app.get('/task/get', (req, res) =>
{
    console.log(`Tasks fetched: ${JSON.stringify(tasks)}`);
    res.json(tasks);
});

app.post('/task/update', (req, res) =>
{
    const updatedTask = req.body;
    const taskId = updatedTask.id;

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1)
    {
        tasks[taskIndex] = updatedTask;
        console.log(`Task updated: ${JSON.stringify(updatedTask)}`);
        res.send();
    } else
    {
        console.log(`Task not found: ${taskId}`);
        res.status(404).send();
    }
});

app.post('/task/delete', (req, res) =>
{
    const taskId = req.body.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1)
    {
        tasks.splice(taskIndex, 1);
        console.log(`Task deleted: ${taskId}`);
        res.send();
    } else
    {
        console.log(`Task not found: ${taskId}`);
        res.status(404).send();
    }
});


const server = app.listen(4000, () => console.log('Server started on port 4000'));

module.exports = { app, server };
