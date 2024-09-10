import axios from 'axios';
import { Task } from '../types/Task';

const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${baseURL}/tasks`);
  return response.data;
};

// Add a new task
export const addTask = async (newTask: Task): Promise<void> => {
  await axios.post(`${baseURL}/tasks`, newTask);
};

// Delete a task by ID
export const deleteTask = async (taskId: string): Promise<void> => {
  await axios.delete(`${baseURL}/tasks/${taskId}`);
};

// Update a task by ID
export const updateTask = async (taskId: string, updatedTask: Task): Promise<void> => {
  await axios.put(`${baseURL}/tasks/${taskId}`, updatedTask);
};
