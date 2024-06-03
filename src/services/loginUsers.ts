// services/authService.js
import axios from "./axios";

const LOGIN_USERS_URL = 'usuarios/';

const loginUser = async (nombre, password) => {
    try {
        const response = await axios.post(LOGIN_USERS_URL + nombre + '/' + password);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export default loginUser;
