import api from "./api";

export const analyzeResume = async (text) => {
  const res = await api.post("/ai/analyze", { text });
  return res.data;
};
