import axios from "./axios";

const SAVE_EVENTS_URL = '/eventos/saveEvents';

const prepararDatosParticipantes = (rolesSeleccionados) => {
    return Object.keys(rolesSeleccionados).map(key => ({
        id: rolesSeleccionados[key].userCode,
        role: rolesSeleccionados[key].role
    }));
};

export default async function saveEvents(event) {
    const idValue = Math.floor(Math.random() * 100000000);
    const idValueLugarEvento = Math.floor(Math.random() * 100000000);
    const participantesRoles = prepararDatosParticipantes(event.rolesSeleccionados);
    try {
        console.log('event', participantesRoles);
        const response = await axios.post(SAVE_EVENTS_URL,
            {
                "id": idValue,
                "categoria": event.categoria,
                "titulo": event.titulo,
                "descripcion": event.descripcion,
                "fecha":event.fecha,
                "estado": event.estado,
                "lugarDelEvento": {
                      "id": idValueLugarEvento,
                      "name": event.nombreEvento,
                      "direccion" :event.direccion,
                      "city":event.city
                  },
                "facultades": event.facultadesSeleccionadas,
                "programas": event.programasSeleccionados,
                "participantes": participantesRoles
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear el destino:', error);
        throw error;
    }
}
