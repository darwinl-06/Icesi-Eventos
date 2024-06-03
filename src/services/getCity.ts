import axios from "./axios";

const GET_CITY_URL = 'ciudades/getCiudades'

export default async function getCity() {

    try {
        const response = await axios.get(GET_CITY_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las ciudades:', error);
        throw error;
    }
}