import axios from "./axios";

const GET_FACULTADES_URL = 'programas/getProgramasPorFacultades'

export default async function getProgramas(idFacultad) {

    try {
        const response = await axios.get(GET_FACULTADES_URL + '/' +idFacultad);
        return response.data;
    } catch (error) {
        console.error('Error al obtener facultades:', error);
        throw error;
    }
}