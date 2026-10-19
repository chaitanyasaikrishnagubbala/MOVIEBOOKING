import api from "./api";

const BASE_URL = "/users";


// =========================
// GET CURRENT USER
// =========================

export const getCurrentUser = async () => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    `${BASE_URL}/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =========================
// GET ALL USERS - ADMIN
// =========================

export const getAllUsers = async () => {

  try {

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

  } catch (error) {

    console.error(
      "Get All Users Error:",
      error.response
    );

    throw error;
  }
};


// =========================
// GET USER BY ID - ADMIN
// =========================

export const getUserById = async (id) => {

  try {

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

  } catch (error) {

    console.error(
      "Get User Error:",
      error.response
    );

    throw error;
  }
};


// =========================
// UPDATE USER - ADMIN
// =========================

export const updateUser = async (id, userData) => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.put(
      `${BASE_URL}/${id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Update User Error:",
      error.response
    );

    throw error;
  }
};


// =========================
// DELETE USER - ADMIN
// =========================

export const deleteUser = async (id) => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.delete(
      `${BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Delete User Error:",
      error.response
    );

    throw error;
  }
};