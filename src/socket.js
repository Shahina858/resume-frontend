import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  withCredentials: true, // 🔥 MUST MATCH SERVER
  transports: ["websocket", "polling"], // fallback safe
});

export default socket;