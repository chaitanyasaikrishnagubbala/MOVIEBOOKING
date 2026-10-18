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

export const getTheaterById = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const addTheater = async (theater) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        BASE_URL,
        theater,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const updateTheater = async (id, theater) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${BASE_URL}/${id}`,
        theater,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const deleteTheater = async (id) => {
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