import axios from "./axios";

const GET_FACULTAD_URL = 'facultades/getFacultad'

export default async function getFacultadById(idFacultad) {

    try {
        const response = await axios.get(GET_FACULTAD_URL + "/" + idFacultad);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la ciudad:', error);
        throw error;
    }
}