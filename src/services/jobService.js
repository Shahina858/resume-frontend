import api from "./api";

/* Generate jobs for a specific resume */
export const generateJobs = async (resumeId) => {
  const res = await api.post(`/jobs/generate/${resumeId}`);
  return res.data;
};

/* Get logged-in user's jobs */
export const getMyJobs = async () => {
  const res = await api.get("/jobs/my");
  return res.data;
};

/* Apply to a job */
export const applyToJob = async (jobId) => {
  const res = await api.post(`/jobs/apply/${jobId}`);
  return res.data;
};

export const cancelJob = async (jobId) => {
  const res = await api.post(`/jobs/cancel/${jobId}`);
  return res.data;
};