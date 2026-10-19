import api from "./api";

const BASE_URL = "/transactions";


export const getAllTransactions = async () => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    BASE_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getTransactionById = async (id) => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    `${BASE_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};