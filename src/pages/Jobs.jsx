import { useEffect, useState } from "react";
import { getMyJobs, applyToJob, cancelJob } from "../services/jobService";
import { generateTailoredResume } from "../services/tailoredResumeService";
import useResumeStore from "../store/resumeStore";

export default function Jobs() {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tailoringJobId, setTailoringJobId] = useState(null);

  const { resume } = useResumeStore();

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs();
      setRecommendedJobs(data.filter((job) => !job.applied));
      setAppliedJobs(data.filter((job) => job.applied));
    } catch (err) {
      console.error("Failed to fetch jobs ❌", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    await applyToJob(jobId);
    fetchJobs();
  };

  const handleCancel = async (jobId) => {
    await cancelJob(jobId);
    fetchJobs();
  };

  const handleTailor = async (job) => {
    if (!resume) {
      alert("Please upload your resume first");
      return;
    }

    try {
      setTailoringJobId(job._id);

      await generateTailoredResume({
        resumeId: resume._id,
        jobTitle: job.title,
        company: job.company,
        jobDescription: job.description || job.title,
      });

      alert("✅ Tailored resume generated successfully!");
    } catch (err) {
      console.error("Tailoring failed ❌", err);
      alert("Failed to generate tailored resume");
    } finally {
      setTailoringJobId(null);
    }
  };

  if (loading) {
    return <div className="p-6">Loading jobs...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Job Matches</h1>

      {/* RECOMMENDED JOBS */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Recommended Jobs</h2>

        {recommendedJobs.length === 0 ? (
          <p className="text-gray-500">No recommended jobs available.</p>
        ) : (
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
             <JobCard
  key={job._id}
  job={job}
  onApply={handleApply}
  onCancel={handleCancel}
/>
            ))}
          </div>
        )}
      </section>

      {/* APPLIED JOBS */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Applied Jobs</h2>

        {appliedJobs.length === 0 ? (
          <p className="text-gray-500">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <AppliedJobCard
                key={job._id}
                job={job}
                onCancel={() => handleCancel(job._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================
   JOB CARD – RECOMMENDED
========================= */
function JobCard({ job, onApply, onTailor, tailoring }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded shadow space-y-3">
      <div>
        <h3 className="font-semibold">{job.title}</h3>
        <p className="text-sm text-gray-500">
          {job.company} • {job.platform}
        </p>
      </div>

      <p className="text-xs">
        Match Score:{" "}
        <span className="font-bold text-indigo-600">
          {job.matchScore}
        </span>
      </p>

      <div className="flex flex-wrap gap-2">
        {job.matchedSkills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onApply}
          className="px-4 py-2 rounded text-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Apply
        </button>

        <button
          onClick={onTailor}
          disabled={tailoring}
          className={`px-4 py-2 rounded text-sm text-white ${
            tailoring
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {tailoring ? "Tailoring..." : "Tailor Resume"}
        </button>
      </div>
    </div>
  );
}

/* =========================
   JOB CARD – APPLIED
========================= */
function AppliedJobCard({ job, onCancel }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded shadow space-y-3">
      <div>
        <h3 className="font-semibold">{job.title}</h3>
        <p className="text-sm text-gray-500">
          {job.company} • {job.platform}
        </p>
      </div>

      <button
        onClick={onCancel}
        className="px-4 py-2 rounded text-sm text-white bg-red-600 hover:bg-red-700"
      >
        Cancel Application
      </button>
    </div>
  );
}