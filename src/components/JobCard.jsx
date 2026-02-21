import { useState } from "react";

export default function JobCard({
  job,
  onApply,
  onCancel,
}) {
  const [loading, setLoading] = useState(false);

 const handleApply = async () => {
  setLoading(true);

  // 1️⃣ Save applied state in backend
  await onApply(job._id);

  // 2️⃣ Open REAL vacancy page
  if (job.applyUrl) {
    window.open(job.applyUrl, "_blank");
  } else {
    alert("No external apply link available for this job.");
  }

  setLoading(false);
};

  const handleCancel = async () => {
    setLoading(true);
    await onCancel(job._id);
    setLoading(false);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-5 rounded shadow space-y-2">
      <h3 className="font-semibold text-lg">{job.title}</h3>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        {job.company} • {job.platform}
      </p>

      {job.location && (
        <p className="text-xs text-gray-400">{job.location}</p>
      )}

      {/* MATCH INFO */}
      {job.matchScore !== undefined && (
        <p className="text-xs mt-1">
          Match Score:{" "}
          <span className="font-bold text-indigo-600">
            {job.matchScore}
          </span>
        </p>
      )}

      {/* APPLY LINK (REAL PLATFORM) */}
      {job.applyUrl && (
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 underline inline-block"
        >
          Apply on {job.platform}
        </a>
      )}

      {/* ACTION BUTTON */}
      <div className="pt-2">
        {!job.applied ? (
          <button
            onClick={handleApply}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm disabled:opacity-50"
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        ) : (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm disabled:opacity-50"
          >
            {loading ? "Cancelling..." : "Cancel Application"}
          </button>
        )}
      </div>

      {/* STATUS BADGE */}
      {job.applied && (
        <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">
          Applied
        </span>
      )}
    </div>
  );
}