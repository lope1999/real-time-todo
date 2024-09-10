import { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify'; 
import { channel } from '../services/pusher';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { fetchTasks } from '../services/taskServices';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  
  const getTasks = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      toast.error('Error fetching tasks');
      console.error('Error fetching tasks:', error);
    }
  }, [setTasks]); 

  useEffect(() => {
    getTasks(); 

    channel.bind('task-added', (newTask: Task) => {
      setTasks(prev => [...prev, newTask]);
    });

    channel.bind('task-updated', (updatedTask: Task) => {
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    });

    channel.bind('task-deleted', (deletedTaskId: string) => {
      setTasks(prev => prev.filter(t => t.id !== deletedTaskId));
    });

    return () => {
      channel.unbind_all();
    };
  }, [getTasks, setTasks]); 

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} setTasks={setTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
