import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true, // 🔥 MUST MATCH SERVER
  transports: ["websocket", "polling"], // fallback safe
});

export default socket;