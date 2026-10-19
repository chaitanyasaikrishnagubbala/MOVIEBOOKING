import api from "./api";

const BASE_URL = "/movies";

export const getAllMovies = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Movie API Error:", error.response);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Movie Details API Error:", error.response);
    throw error;
  }
};