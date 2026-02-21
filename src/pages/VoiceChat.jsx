// client/src/pages/VoiceChat.jsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuthStore from "../store/authStore";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export default function VoiceChat() {
  const { user } = useAuthStore();
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [audioURL, setAudioURL] = useState(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (user) {
      socket.emit("join", { userId: user.id, role: "user" });
    }

    socket.on("admin-voice-reply", ({ audio }) => {
      const blob = new Blob([audio], { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    });

    return () => socket.off();
  }, [user]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const sendVoice = async () => {
    const blob = await fetch(audioURL).then((r) => r.blob());
    socket.emit("voice-message", {
      fromUserId: user.id, // 🔥 FIXED
      audio: blob,
    });
    setAudioURL(null);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Voice Chat</h1>

      {audioURL && <audio controls src={audioURL} />}

      <div className="flex gap-3">
        {!recording ? (
          <button onClick={startRecording} className="bg-indigo-600 text-white px-4 py-2 rounded">
            Record
          </button>
        ) : (
          <button onClick={stopRecording} className="bg-red-600 text-white px-4 py-2 rounded">
            Stop
          </button>
        )}

        {audioURL && (
          <button onClick={sendVoice} className="bg-green-600 text-white px-4 py-2 rounded">
            Send
          </button>
        )}
      </div>
    </div>
  );
}