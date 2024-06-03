// services/authService.js
import axios from "./axios";

const GET_RECOMMENDED_EVENTS_URL = 'eventos/getCategoriasEvents/';

const getRecommendedEvents = async (idUser) => {
    try {
        const response = await axios.post(GET_RECOMMENDED_EVENTS_URL + idUser);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export default getRecommendedEvents;
