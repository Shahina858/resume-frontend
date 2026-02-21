import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAdmin: JSON.parse(localStorage.getItem("user"))?.role === "admin",

  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, isAdmin: userData.role === "admin" });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, isAdmin: false });
  },
}));

export default useAuthStore;
