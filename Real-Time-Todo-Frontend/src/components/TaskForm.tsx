import React, { useState } from 'react';
import { toast } from 'react-toastify';  
import { Task } from '../types/Task';
import { addTask } from '../services/taskServices';


const TaskForm: React.FC<{ tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> }> = ({ tasks, setTasks }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: Date.now().toString(),
      description: task,
      isDone: false,
      creator: 'User 1'
    };

    setTasks([...tasks, newTask]);

    try {
      await addTask(newTask);
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Error adding task');
      console.error('Error adding task:', error);
    }

    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="form-control"
          placeholder="Add a task..."
          required
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">Add Task</button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
