import axios from "./axios";

const GET_USERS_URL = 'usuarios/getUsers'

export default async function getUsers() {

    try {
        const response = await axios.get(GET_USERS_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener facultades:', error);
        throw error;
    }
}