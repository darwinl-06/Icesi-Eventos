import axios from "./axios";

const GET_PROGRAMA_URL = 'programas/getPrograma'

export default async function getProgramaById(idPrograma) {

    try {
        const response = await axios.get(GET_PROGRAMA_URL + "/" + idPrograma);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la ciudad:', error);
        throw error;
    }
}