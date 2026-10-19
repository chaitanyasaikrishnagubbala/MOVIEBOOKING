import api from "./api";

export const register = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};