import axios from "./axios";

const ALL_EVENTS_URL = 'eventos/getEvents'

export default async function allEvents() {

    try {
        const response = await axios.get(ALL_EVENTS_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener destinos:', error);
        throw error;
    }
}