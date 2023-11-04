import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'; // Import TouchableOpacity
import axios from 'axios';

const TaskManager = () =>
{
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() =>
  {
    // Fetch tasks from the API when the component mounts
    axios.get('http://192.168.1.254:4000/task/get')
      .then(response =>
      {
        setTasks(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleCreateTask = () =>
  {
    axios.post('http://192.168.1.254:4000/task/create', { name: newTask })
      .then(response =>
      {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch(error => console.error(error));
  };

  const handleDeleteTask = (taskId) =>
  {
    axios.post('http://192.168.1.254:4000/task/delete', { id: taskId })
      .then(() =>
      {
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Manager</Text>
      <TextInput
        value={newTask}
        onChangeText={text => setNewTask(text)}
        style={styles.input}
        placeholder="New Task"
      />
      <TouchableOpacity
        style={styles.customButton}
        onPress={handleCreateTask}
      >
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  customButton: {
    backgroundColor: 'cyan', // Red background color
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red', // Red background color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black', // White text color
    fontSize: 16,
  },
  taskItem: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    width: 200,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  taskName: {
    fontSize: 16,
  },
});

export default TaskManager;
