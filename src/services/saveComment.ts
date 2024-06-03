import axios from "./axios";

const PUT_COMMENT_URL = 'comentarios/saveComentariosById'

export default async function saveComment(idEvent, comment) {
    try {
        const response = await axios.post(PUT_COMMENT_URL + '/' + idEvent, {
            id: Math.floor(Math.random() * 1000000000),
            username: comment.username,
            contenido: comment.contenido,
            fecha: new Date().toISOString() 
        });
        return response.data;
    } catch (error) {
        console.error('Error al guardar comentario:', error);
        throw error;
    }
}