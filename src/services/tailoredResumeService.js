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

  window.open(
    `http://localhost:5000/api/tailored-resume/${id}/pdf?token=${token}`,
    "_blank"
  );
};