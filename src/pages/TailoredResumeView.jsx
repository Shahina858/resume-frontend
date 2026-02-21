import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTailoredResumeById,
  downloadTailoredResumePDF,
} from "../services/tailoredResumeService";

export default function TailoredResumeView() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    getTailoredResumeById(id).then(setResume);
  }, [id]);

  if (!resume) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {resume.jobTitle} – {resume.company}
        </h1>

        <button
  onClick={() => downloadTailoredResumePDF(resume._id)}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Download PDF
</button>
      </div>

      <div className="bg-white p-6 rounded shadow whitespace-pre-wrap text-sm">
        {resume.tailoredText}
      </div>
    </div>
  );
}