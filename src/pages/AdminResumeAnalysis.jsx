import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import AnalysisCard from "../components/AnalysisCard";

export default function AdminResumeAnalysis() {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/resume/${resumeId}`);
        setResume(res.data);
      } catch (err) {
        console.error("Failed to load resume ❌", err);
        setResume(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  if (loading) {
    return <div className="p-6">Loading resume analysis...</div>;
  }

  if (!resume || !resume.aiAnalysis) {
    return <div className="p-6">No analysis found.</div>;
  }

  const { aiAnalysis } = resume;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">AI Resume Analysis</h1>
        <p className="text-sm text-gray-500">
          {resume.user?.username} • {resume.user?.email}
        </p>
      </div>

      {/* ATS SCORE */}
      <div className="bg-white p-6 rounded shadow">
        <p className="text-3xl font-bold text-indigo-600">
          ATS Score: {aiAnalysis.ats_score}%
        </p>
        <p className="mt-2 text-gray-600">{aiAnalysis.summary}</p>
      </div>

      {/* ANALYSIS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalysisCard title="Strengths" items={aiAnalysis.strengths} />
        <AnalysisCard title="Missing Keywords" items={aiAnalysis.missing_keywords} />
        <AnalysisCard title="Weaknesses" items={aiAnalysis.weaknesses} />
        <AnalysisCard title="Improvements" items={aiAnalysis.improvement_suggestions} />
      </div>

      {/* 🔥 RESUME CONTENT PREVIEW */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-3">Resume Content</h2>
        <div className="bg-gray-50 p-4 rounded h-72 overflow-y-auto text-sm whitespace-pre-wrap">
          {resume.text}
        </div>
      </div>
    </div>
  );
}