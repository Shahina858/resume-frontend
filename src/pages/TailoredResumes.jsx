import { useEffect, useState } from "react";
import { getMyTailoredResumes } from "../services/tailoredResumeService";
import { useNavigate } from "react-router-dom";

export default function TailoredResumes() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyTailoredResumes().then(setResumes);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Tailored Resumes</h1>

      {resumes.length === 0 ? (
        <p className="text-gray-500">No tailored resumes yet.</p>
      ) : (
        resumes.map((r) => (
          <div
            key={r._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{r.jobTitle}</p>
              <p className="text-sm text-gray-500">{r.company}</p>
              <p className="text-xs text-gray-400">
                ATS Score: {r.atsScore}%
              </p>
            </div>

            <button
              onClick={() => navigate(`/tailored-resumes/${r._id}`)}
              className="text-indigo-600 hover:underline text-sm"
            >
              View →
            </button>
          </div>
        ))
      )}
    </div>
  );
}