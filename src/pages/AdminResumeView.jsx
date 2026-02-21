import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function AdminResumeView() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // "analysis" | "skill-gap" | null

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resume");
      setResumes(res.data);
    } catch (err) {
      console.error("FAILED TO FETCH RESUMES ❌", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading resumes...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT: RESUME LIST */}
      <div className="lg:col-span-1 space-y-4">
        <h1 className="text-xl font-bold">
          {mode === "analysis"
            ? "Select Resume for AI Analysis"
            : mode === "skill-gap"
            ? "Select Resume for Skill Gap Analysis"
            : "Uploaded Resumes"}
        </h1>

        {resumes.length === 0 ? (
          <p className="text-gray-500">No resumes uploaded yet.</p>
        ) : (
          resumes.map((resume) => (
            <div
              key={resume._id}
              onClick={() => setSelectedResume(resume)}
              className={`cursor-pointer p-4 rounded border transition ${
                selectedResume?._id === resume._id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                {resume.user?.username || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500">
                {resume.user?.email}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Uploaded: {new Date(resume.createdAt).toLocaleString()}
              </p>
              <p className="text-xs mt-2">
                ATS Score:{" "}
                <span className="font-bold text-indigo-600">
                  {resume.aiAnalysis?.ats_score ?? "N/A"}%
                </span>
              </p>
            </div>
          ))
        )}
      </div>

      {/* RIGHT: RESUME DETAILS */}
      <div className="lg:col-span-2">
        {!selectedResume ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a resume to continue
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
            {/* HEADER */}
            <div>
              <h2 className="text-lg font-semibold">Resume Review</h2>
              <p className="text-sm text-gray-500">
                {selectedResume.user?.username} •{" "}
                {selectedResume.user?.email}
              </p>
            </div>

            {/* 🔥 MODE-BASED ACTIONS */}
            {mode && (
              <div className="flex gap-4">
                {mode === "analysis" && (
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/resumes/${selectedResume._id}/analysis`
                      )
                    }
                    className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                  >
                    View AI Resume Analysis
                  </button>
                )}

                {mode === "skill-gap" && (
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/resumes/${selectedResume._id}/skill-gap`
                      )
                    }
                    className="px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-900"
                  >
                    View Skill Gap Analysis
                  </button>
                )}
              </div>
            )}

            {/* ATS SCORE */}
            <div className="bg-indigo-50 p-4 rounded">
              <p className="text-2xl font-bold text-indigo-600">
                ATS Score: {selectedResume.aiAnalysis?.ats_score}%
              </p>
              <p className="text-sm mt-1 text-gray-600">
                {selectedResume.aiAnalysis?.summary}
              </p>
            </div>

            {/* SKILLS */}
            <div>
              <h3 className="font-semibold mb-2">Skills Identified</h3>
              <div className="flex flex-wrap gap-2">
                {selectedResume.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-gray-100 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* RESUME CONTENT */}
            <div>
              <h3 className="font-semibold mb-2">Resume Content</h3>
              <div className="bg-gray-50 p-4 rounded h-64 overflow-y-auto text-sm whitespace-pre-wrap">
                {selectedResume.text}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}