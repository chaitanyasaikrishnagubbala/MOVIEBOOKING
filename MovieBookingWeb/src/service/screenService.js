import axios from "axios";

const BASE_URL = "http://localhost:8081/screens";

export const getAllScreens = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};


export const getScreenById = async (id) => {

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


export const addScreen = async (screenData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        BASE_URL,
        screenData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const updateScreen = async (id, screenData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${BASE_URL}/${id}`,
        screenData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const deleteScreen = async (id) => {

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