import ResumeUpload from "../components/ResumeUpload";
import ResumePreview from "../components/ResumePreview";
import useResumeStore from "../store/resumeStore";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { resume } = useResumeStore();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* UPLOAD SECTION */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <ResumeUpload />

        {/* ✅ SHOW UPLOAD STATUS INSTEAD OF FILE */}
        {resume && (
          <div className="p-4 rounded bg-green-50 dark:bg-gray-900 border border-green-200">
            <p className="text-sm text-green-700 dark:text-green-400 font-medium">
              ✅ Resume uploaded successfully
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Uploaded on {new Date(resume.createdAt).toLocaleString()}
            </p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => navigate("/analysis")}
                className="text-sm text-indigo-600 hover:underline"
              >
                View Resume Analysis →
              </button>

              <button
                onClick={() => navigate("/jobs")}
                className="text-sm text-indigo-600 hover:underline"
              >
                View Job Matches →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PREVIEW SECTION */}
      {resume && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="font-semibold mb-2">Resume Preview</h2>
          <ResumePreview text={resume.text} />
        </div>
      )}
    </div>
  );
}