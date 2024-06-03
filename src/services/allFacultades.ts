import axios from "./axios";

const ALL_FACULTADES_URL = 'facultades/getFacultades'

export default async function allFacultades() {

    try {
        const response = await axios.get(ALL_FACULTADES_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener facultades:', error);
        throw error;
    }
}