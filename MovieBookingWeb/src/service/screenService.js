import api from "./api";

const BASE_URL = "/screens";

export const getAllScreens = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};


export const getScreenById = async (id) => {

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


export const addScreen = async (screenData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
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

    const response = await api.put(
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

    const response = await api.delete(
        `${BASE_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};