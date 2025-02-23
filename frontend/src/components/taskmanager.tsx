// src/components/TaskManager.tsx
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/api';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const TaskManager: React.FC = () => {
  const token = localStorage.getItem('token') || '';
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const fetchTasks = async () => {
    const data = await getTasks(token);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = await createTask(token, newTitle, newDescription);
    setTasks([...tasks, task]);
    setNewTitle('');
    setNewDescription('');
  };

  const handleToggleComplete = async (task: Task) => {
    const updated = await updateTask(token, task.id, { ...task, isComplete: !task.isComplete });
    setTasks(tasks.map(t => (t.id === task.id ? updated : t)));
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(token, id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => handleToggleComplete(task)}>
              {task.isComplete ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateTask}>
        <h3>Create Task</h3>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskManager;
