import { useState, useEffect } from "react";
import SkillGapTable from "../components/SkillGapTable";
import CourseCards from "../components/CourseCards";
import { getSkillGap } from "../services/skillGapService";
import useResumeStore from "../store/resumeStore";
import { Link } from "react-router-dom";

export default function SkillGap() {
  const { resume } = useResumeStore();
  const [role, setRole] = useState("Frontend Developer");
  const [result, setResult] = useState({ missingSkills: [], courses: [] });

  useEffect(() => {
    if (resume?.skills) {
      getSkillGap(resume.skills, role)
        .then(setResult)
        .catch(err => console.error("Skill Gap Analysis Failed:", err));
    }
  }, [resume, role]);

  if (!resume) {
    return (
      <div className="p-6 text-center space-y-4">
        <h1 className="text-xl font-bold">Skill Gap Analysis</h1>
        <p className="text-gray-500">Please upload your resume first to analyze skill gaps.</p>
        <Link to="/" className="text-indigo-500 hover:underline">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Skill Gap Analysis</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-800"
        >
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p className="text-sm font-medium">Analyzing for: <span className="text-indigo-500">{role}</span></p>
        <p className="text-xs text-gray-500">Based on skills extracted from your resume: {resume.skills.join(", ")}</p>
      </div>

      <SkillGapTable skills={result.missingSkills} />
      <CourseCards courses={result.courses} />
    </div>
  );
}
