import axios from "axios";

const BASE_URL = "http://localhost:8081/bookings";


export const getMyBookings = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${BASE_URL}/my-bookings`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const getBookedSeatIds = async (showId) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${BASE_URL}/show/${showId}/seats`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const bookTickets = async (bookingData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${BASE_URL}/book`,
        bookingData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const cancelBooking = async (bookingId) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${BASE_URL}/cancel/${bookingId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const getBookedSeatNumbers = async (bookingId) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${BASE_URL}/${bookingId}/seats`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
export const getAllBookings = async () => {

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


export const getBookingById = async (bookingId) => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/${bookingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};