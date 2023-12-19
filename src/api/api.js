import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const get = async (endpoint, headers = {}) => {
  try {
    const token = JSON.parse(localStorage.getItem("accessToken"));

    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição GET:", error);
    throw error;
  }
};

export const post = async (endpoint, data = {}, headers = {}) => {
  try {
    const token = JSON.parse(localStorage.getItem("accessToken"));

    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição POST:", error);
    throw error;
  }
};
