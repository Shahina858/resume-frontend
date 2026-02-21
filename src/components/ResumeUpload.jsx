import { useRef, useState } from "react";
import api from "../services/api";
import useResumeStore from "../store/resumeStore";
import { generateJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";

export default function ResumeUpload({ onUploaded }) {
  const { setResume, setAnalysis } = useResumeStore();
  const [uploadedResume, setUploadedResume] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      /* 1️⃣ Upload resume */
      const res = await api.post("/resume/upload", formData);
      const data = res.data;

      setResume(data);
      setAnalysis(data.aiAnalysis);
      setUploadedResume(data);

      /* 2️⃣ 🔥 Generate jobs for THIS resume */
   await generateJobs(data._id);

// ✅ ALWAYS navigate
navigate("/jobs");

      /* 3️⃣ Optional callback */
      if (onUploaded) onUploaded(data);

      /* 4️⃣ Navigate to jobs page */
      // navigate("/jobs");

      /* 5️⃣ Reset file input cleanly */
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error("UPLOAD FAILED ❌", errorMsg);
      alert(`Failed to upload resume: ${errorMsg}`);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        Upload PDF Resume
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100
          dark:file:bg-gray-700 dark:file:text-gray-300"
      />

      {/* ✅ Upload status (REAL-WORLD UX) */}
      {uploadedResume && (
        <p className="text-xs text-green-600">
          ✅ Resume uploaded on{" "}
          {new Date(uploadedResume.createdAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}