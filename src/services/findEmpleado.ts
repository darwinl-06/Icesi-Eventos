import axios from "./axios";

const FIND_EMPLEADOS_URL = 'empleados'

export default async function findEmpleado(idEmpleado) {

    try {
        const response = await axios.get(FIND_EMPLEADOS_URL + "/" + idEmpleado);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        throw error;
    }
}