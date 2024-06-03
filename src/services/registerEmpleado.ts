import axios from "./axios";

const USUARIO_REGISTER_URL = 'usuarios/saveUsuarioEmpleado'

export default async function registerEmpleado(username, password, employee) {

    try {
        console.log("registerEmpleado: ", username, password, employee);
        const response = await axios.post(USUARIO_REGISTER_URL + "/" + username + "/" + password, employee);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error;
    }
}