import axios from "axios";

const BASE_URL = "http://localhost:8081/transactions";


export const getAllTransactions = async () => {

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


export const getTransactionById = async (id) => {

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