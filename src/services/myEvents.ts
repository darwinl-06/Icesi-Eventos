import axios from "./axios";

const GET_EVENT_URL = 'eventos/getEvents'

export default async function getEventById(idEvent) {
    try {
        const response = await axios.post(GET_EVENT_URL + '/' + idEvent);
        return response.data;
    } catch (error) {
        console.error('Error al obtener facultades:', error);
        throw error;
    }
}