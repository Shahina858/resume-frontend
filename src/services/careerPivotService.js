import api from "./api";

export const getCareerPivot = async (skills) => {
    const res = await api.post("/career/pivot", { skills });
    return res.data;
};
