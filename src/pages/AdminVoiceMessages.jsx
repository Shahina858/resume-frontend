// client/src/pages/AdminVoiceMessages.jsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuthStore from "../store/authStore";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export default function AdminVoiceMessages() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [replyUserId, setReplyUserId] = useState(null);

  useEffect(() => {
    if (user) {
      socket.emit("join", { userId: user.id, role: "admin" });
    }

    socket.on("voice-message", ({ fromUserId, audio }) => {
      const blob = new Blob([audio], { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      setMessages((prev) => [
        ...prev,
        { fromUserId, url },
      ]);
    });

    return () => socket.off();
  }, [user]);

  const startReply = async (userId) => {
    setReplyUserId(userId);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (e) =>
      audioChunks.current.push(e.data);

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      socket.emit("admin-voice-reply", {
        toUserId: userId,
        audio: blob,
      });
    };

    mediaRecorderRef.current.start();
  };

  const stopReply = () => mediaRecorderRef.current.stop();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Voice Messages</h1>

      {messages.length === 0 && <p>No voice messages yet</p>}

      {messages.map((msg, i) => (
        <div key={i} className="border p-4 rounded">
          <p className="text-sm mb-2">From user: {msg.fromUserId}</p>
          <audio controls src={msg.url} />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => startReply(msg.fromUserId)}
              className="bg-indigo-600 text-white px-3 py-1 rounded"
            >
              Reply
            </button>
            <button
              onClick={stopReply}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Stop
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}