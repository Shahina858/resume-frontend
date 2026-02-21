import AnalysisCard from "../components/AnalysisCard";
import useResumeStore from "../store/resumeStore";
import { Link } from "react-router-dom";

export default function ResumeAnalysis() {
  const { analysis } = useResumeStore();

  if (!analysis) {
    return (
      <div className="p-6 text-center space-y-4">
        <h1 className="text-xl font-bold">AI Resume Analysis</h1>
        <p className="text-gray-500">
          No resume analysis found. Please upload your resume first.
        </p>
        <Link to="/dashboard" className="text-indigo-500 hover:underline">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">AI Resume Analysis</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <p className="text-3xl font-bold text-indigo-500">
          ATS Score: {analysis.ats_score}%
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {analysis.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalysisCard title="Strengths" items={analysis.strengths || []} />
        <AnalysisCard title="Missing Keywords" items={analysis.missing_keywords || []} />
        <AnalysisCard title="Weaknesses" items={analysis.weaknesses || []} />
        <AnalysisCard
          title="Improvements"
          items={analysis.improvement_suggestions || []}
        />
      </div>
    </div>
  );
}