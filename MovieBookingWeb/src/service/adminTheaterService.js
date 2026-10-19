import api from "./api";

const BASE_URL = "/theaters";

export const getAllTheaters = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteTheater = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};