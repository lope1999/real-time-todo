import Pusher from "pusher-js";

// Initialize Pusher
const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY!, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER!,
});

export const channel = pusher.subscribe('tasks-channel');

export default pusher;
