import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () =>
{
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() =>
  {
    // Fetch tasks from the API when the component mounts
    axios.get('http://localhost:4000/task/get')
      .then(response =>
      {
        setTasks(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleCreateTask = () =>
  {
    axios.post('http://localhost:4000/task/create', { name: newTask })
      .then(response =>
      {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch(error => console.error(error));
  };


  const handleDeleteTask = (taskId) =>
  {
    console.log("Deleting task with ID: ", taskId); // Debugging line
    axios.post('http://localhost:4000/task/delete', { id: taskId })
      .then(() =>
      {
        // After deleting the task, update the tasks list by filtering out the deleted task
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => console.error(error));
  };


  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button className="create-button" onClick={handleCreateTask}>Create Task</button>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span className="task-name">{task.name}</span>
            <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
