import axios from "axios";

const BASE_URL = "http://localhost:8081/seats";

export const getSeatsByScreen = async (screenId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/screen/${screenId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Seat API Error:", error.response);
    throw error;
  }
};
// Get all seats - Admin
export const getAllSeats = async () => {
  try {
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
  } catch (error) {
    console.error("Get All Seats Error:", error.response);
    throw error;
  }
};


// Get seat by ID - Admin
export const getSeatById = async (id) => {
  try {
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
  } catch (error) {
    console.error("Get Seat Error:", error.response);
    throw error;
  }
};


// Add seat - Admin
export const addSeat = async (seatData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      BASE_URL,
      seatData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Add Seat Error:", error.response);
    throw error;
  }
};


// Update seat - Admin
export const updateSeat = async (id, seatData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${BASE_URL}/${id}`,
      seatData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update Seat Error:", error.response);
    throw error;
  }
};


// Delete seat - Admin
export const deleteSeat = async (id) => {
  try {
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
  } catch (error) {
    console.error("Delete Seat Error:", error.response);
    throw error;
  }
};