import { useState, useEffect } from "react";
import useResumeStore from "../store/resumeStore";
import { getCareerPivot } from "../services/careerPivotService";
import { Link } from "react-router-dom";

export default function CareerVault() {
  const { resume } = useResumeStore();
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (resume?.skills) {
      getCareerPivot(resume.skills).then(setPrediction);
    }
  }, [resume]);

  if (!resume) {
    return (
      <div className="p-6 text-center space-y-4">
        <h1 className="text-xl font-bold">Career Vault</h1>
        <p className="text-gray-500">Upload your resume to see suggested career paths.</p>
        <Link to="/" className="text-indigo-500 hover:underline">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold mb-4">Career Vault</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">Current Skills:</span>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map(skill => (
              <span key={skill} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-lg font-semibold text-indigo-600">
            Suggested Next Role: {prediction?.suggestedPath || "Software Engineer"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on your expertise in {resume.skills.slice(0, 3).join(", ")}, you are well-positioned to pivot towards more specialized roles.
          </p>
        </div>
      </div>
    </div>
  );
}
