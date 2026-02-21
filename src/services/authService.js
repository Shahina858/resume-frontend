import api from "./api";

// USER AUTH
export const signupUser = async (userData) => {
    const res = await api.post("/users/signup", userData);
    if (res.data.token) {
        localStorage.setItem("token", res.data.token);
    }
    return res.data;
};

export const loginUser = async (email, password) => {
    const res = await api.post("/users/login", { email, password });
    if (res.data.token) {
        localStorage.setItem("token", res.data.token);
    }
    return res.data;
};

// ADMIN AUTH
export const loginAdmin = async (username, password) => {
    const res = await api.post("/admin/login", { username, password });
    if (res.data.token) {
        localStorage.setItem("token", res.data.token);
    }
    return res.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
