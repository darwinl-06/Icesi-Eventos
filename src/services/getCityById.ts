import axios from "./axios";

const GET_CITY_URL = 'ciudades/getCiudad'

export default async function getCityById(idCity) {

    try {
        const response = await axios.get(GET_CITY_URL + "/" + idCity);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la ciudad:', error);
        throw error;
    }
}