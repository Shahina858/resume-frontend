import api from "./api";

/* USER */
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await api.post("/resume/upload", formData);
  return res.data;
};

/* ADMIN */
export const getAllResumesAdmin = async () => {
  const res = await api.get("/admin/resumes");
  return res.data;
};