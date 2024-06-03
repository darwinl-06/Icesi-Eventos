import axios from "./axios";

const GET_EVENT_URL = 'eventos/getEventsById'

export default async function getEventById(idEvent) {
    try {
        console.log('idEvent', idEvent);
        const response = await axios.get(GET_EVENT_URL + '/' + idEvent);
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.error('Error al obtener facultades:', error);
        throw error;
    }
}