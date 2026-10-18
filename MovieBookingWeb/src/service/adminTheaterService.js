import axios from "axios";

const BASE_URL = "http://localhost:8081/theaters";

export const getAllTheaters = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteTheater = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};