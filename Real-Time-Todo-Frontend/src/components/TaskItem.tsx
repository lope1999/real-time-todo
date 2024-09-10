import React from 'react';
import { toast } from 'react-toastify';  // Import toast from react-toastify
import { Task } from '../types/Task';
import { deleteTask, updateTask } from '../services/taskServices';


interface TaskItemProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      setTasks(prev => prev.filter(t => t.id !== task.id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Failed to delete task:', error);
    }
  };

  const toggleDone = async () => {
    try {
      const updatedTask = {
        ...task,
        isDone: !task.isDone,
        markedBy: 'User 2'
      };
      await updateTask(task.id, updatedTask);
      setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Failed to update task:', error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="form-check">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={toggleDone}
          className="form-check-input"
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`} className={`form-check-label ${task.isDone ? 'text-decoration-line-through' : ''}`}>
          {task.description}
          <small className="text-muted"> (Created by: {task.creator})</small>
          {task.isDone && task.markedBy && (
            <small className="text-success"> (Marked as done by: {task.markedBy})</small>
          )}
        </label>
      </div>
      <button onClick={handleDelete} className="btn btn-danger btn-sm ml-2">Delete</button>
    </li>
  );
};

export default TaskItem;
