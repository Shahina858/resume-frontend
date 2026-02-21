import api from "./api";

export const generateTailoredResume = async (payload) => {
  const res = await api.post("/tailored-resume/generate", payload);
  return res.data;
};

export const getMyTailoredResumes = async () => {
  const res = await api.get("/tailored-resume");
  return res.data;
};

export const getTailoredResumeById = async (id) => {
  const res = await api.get(`/tailored-resume/${id}`);
  return res.data;
};

export const downloadTailoredResumePDF = (id) => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  if (!baseURL) {
    console.error("VITE_API_BASE_URL is not defined");
    return;
  }

  window.open(
    `${baseURL}/api/tailored-resume/${id}/pdf?token=${token}`,
    "_blank"
  );
};