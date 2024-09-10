# Real-Time Collaborative To-Do List Application

This project is a real-time collaborative to-do list application built using **React**, **TypeScript**, **Bootstrap**, **Node.js**, and **Pusher**. It allows multiple users to manage tasks simultaneously with real-time updates across clients.

## Table of Contents
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Pusher Integration](#pusher-integration)
- [Tech Stack](#tech-stack)

## Installation

### Backend Setup

1. Navigate to the backend folder:
    ```bash
    cd Real-Time-ToDo-Backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `Real-Time-ToDo-Backend` directory with the following variables (replace with your own credentials):

    ```bash
    PUSHER_APP_ID=your-pusher-app-id
    PUSHER_APP_KEY=your-pusher-app-key
    PUSHER_APP_SECRET=your-pusher-app-secret
    PUSHER_CLUSTER=your-pusher-cluster
    ```

4. Run the backend server:
    ```bash
    npm start
    ```

   The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd Real-Time-ToDo-Frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the `Real-Time-ToDo-Frontend` directory with the following variables (replace with your own credentials):

    ```bash
    REACT_APP_PUSHER_APP_KEY=your-pusher-app-key
    REACT_APP_PUSHER_CLUSTER=your-pusher-cluster
    REACT_APP_BACKEND_URL=http://localhost:5000
    ```

4. Run the frontend application:

    ```bash
    npm start
    ```

   The frontend will be accessible at `http://localhost:3000`.

## Environment Variables

Both the backend and frontend require environment variables to be set.

### Backend (`Real-Time-ToDo-Backend/.env`):
- `PUSHER_APP_ID`: Your Pusher app ID.
- `PUSHER_APP_KEY`: Your Pusher app key.
- `PUSHER_APP_SECRET`: Your Pusher app secret.
- `PUSHER_CLUSTER`: Your Pusher cluster.

### Frontend (`Real-Time-ToDo-Frontend/.env.local`):
- `REACT_APP_PUSHER_APP_KEY`: The Pusher app key for the frontend.
- `REACT_APP_PUSHER_CLUSTER`: The Pusher cluster for the frontend.
- `REACT_APP_BACKEND_URL`: URL to the backend (e.g., `http://localhost:5000`).

## Usage

Once both the backend and frontend are running:

1. Add tasks using the input form on the frontend.
2. Tasks will update in real-time across all connected clients.
3. You can mark tasks as done, update, or delete them, and the changes will reflect instantly for all users.

## Pusher Integration

This application uses **Pusher** for real-time WebSocket communication.

To integrate Pusher:

1. Create a [Pusher account](https://pusher.com/).
2. Create a new app in your Pusher dashboard.
3. Copy the **App ID**, **App Key**, **App Secret**, and **Cluster** from the Pusher dashboard.
4. Add these credentials to both the backend `.env` and frontend `.env.local` files as mentioned earlier.

### Backend Pusher Setup

In `Real-Time-ToDo-Backend`, Pusher is initialized in the `server.js` file:

```js
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});
```

Pusher events are triggered in the routes for adding, updating, and deleting tasks.

### Frontend Pusher Setup

In the frontend, Pusher listens for real-time events using the following setup in the services folder:

```ts
import Pusher from 'pusher-js';

export const channel = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
}).subscribe('tasks-channel');
```

The `channel` object binds to events (`task-added`, `task-updated`, `task-deleted`) to reflect real-time updates in the UI.

## Tech Stack

- **Frontend**: React, TypeScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Real-Time**: Pusher
- **Deployment**: [Vercel](https://vercel.com/) for the frontend, [Heroku](https://www.heroku.com/) or similar for the backend (optional)