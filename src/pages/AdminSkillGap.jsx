import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function AdminSkillGap() {
  const { resumeId } = useParams();
  const [gap, setGap] = useState(null);

  useEffect(() => {
    api.get(`/resume/${resumeId}`)
      .then(res => setGap(res.data.aiAnalysis))
      .catch(() => setGap(null));
  }, [resumeId]);

  if (!gap) {
    return <div className="p-6">No skill gap data found.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Skill Gap Analysis</h1>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-2">Missing Skills</h3>
        <ul className="list-disc ml-6 text-sm">
          {gap.missing_keywords.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}