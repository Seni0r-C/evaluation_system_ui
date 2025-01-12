import axiosInstance from "./axiosConfig";

export const login = async (username, password) => {
    const cleanUsername = username.replace(/@utm\.edu\.ec$/, '');
    return await axiosInstance.post(`/auth/login`, {
        usuario: cleanUsername,
        password,
    });
};

export const fetchUserData = async (token) => {
    return await axiosInstance.get(`/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
