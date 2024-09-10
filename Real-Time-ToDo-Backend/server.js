require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true, 
});

let tasks = [
  { id: '1', description: 'Task 1', isDone: false, creator: 'User 1' },
  { id: '2', description: 'Task 2', isDone: false, creator: 'User 2' },
  { id: '3', description: 'Task 3', isDone: false, creator: 'User 1' },
  { id: '4', description: 'Task 4', isDone: false, creator: 'User 2' }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;  

  tasks.push(newTask);

  pusher.trigger('tasks-channel', 'task-added', newTask);

  res.send({ success: true, task: newTask });
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  tasks = tasks.map(task =>
    task.id === taskId ? updatedTask : task
  );

  pusher.trigger('tasks-channel', 'task-updated', updatedTask);

  res.send({ success: true, task: updatedTask });
});


app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  tasks = tasks.filter(task => task.id !== taskId);

  pusher.trigger('tasks-channel', 'task-deleted', taskId);

  res.send({ success: true });
});


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
