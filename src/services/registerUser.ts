import axios from "./axios";

const USUARIO_REGISTER_URL = 'usuarios/saveUsuario'

export default async function registerUser(user) {

    try {
        console.log('user:', user);
        const response = await axios.post(USUARIO_REGISTER_URL, user);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error;
    }
}