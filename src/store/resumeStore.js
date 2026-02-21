import { create } from "zustand";

const useResumeStore = create((set) => ({
  resume: null,
  analysis: null,

  setResume: (resume) => set({ resume }),
  setAnalysis: (analysis) => set({ analysis }),

  clearResume: () => set({ resume: null, analysis: null }),
}));

export default useResumeStore;
