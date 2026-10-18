import axios from "axios";

const BASE_URL = "http://localhost:8081/shows";

export const getShowsByMovieId = async (movieId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Show API Error:", error.response);
    throw error;
  }
};
// Get all shows
export const getAllShows = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    BASE_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Get show by ID
export const getShowById = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Add show
export const addShow = async (showData) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    BASE_URL,
    showData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Update show
export const updateShow = async (id, showData) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${BASE_URL}/${id}`,
    showData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Delete show
export const deleteShow = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${BASE_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};