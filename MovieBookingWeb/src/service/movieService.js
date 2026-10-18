import axios from "axios";

const BASE_URL = "http://localhost:8081/movies";

export const getAllMovies = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(BASE_URL, {
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

    const response = await axios.get(`${BASE_URL}/${id}`, {
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