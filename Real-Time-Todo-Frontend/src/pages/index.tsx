import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../types/Task';

const defaultTasks: Task[] = [
  { id: '1', description: 'Task 1', isDone: false, creator: 'User 1' },
  { id: '2', description: 'Task 2', isDone: false, creator: 'User 2' },
  { id: '3', description: 'Task 3', isDone: false, creator: 'User 1' },
  { id: '4', description: 'Task 4', isDone: false, creator: 'User 2' },
];

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Real-Time Collaborative To-Do List</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <TaskForm tasks={tasks} setTasks={setTasks} />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
};

export default Home;
