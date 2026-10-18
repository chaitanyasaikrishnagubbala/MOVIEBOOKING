import axios from "axios";

const BASE_URL = "http://localhost:8081/users";
const BASE_URL1 = "http://localhost:8081/auth/login";

export const register = async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (loginData) => {
  try {
    const response = await axios.post(
      `${BASE_URL1}`,
      loginData
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};