import { useEffect, useState } from "react";
import updateEvent from "../services/updateEvent";
import getEventById from "../services/myEvents";
import { Link } from "react-router-dom";
import saveComment from "../services/saveComment";
import {FaCalendarCheck, FaUser} from "react-icons/fa";
import getFacultadById from "../services/getFacultadById";
import getProgramaById from "../services/getProgramaById";
import { FaCarTunnel } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";



const EventModal = ({ show, onClose, event, onEdit, onMsg }) => {
  const [comments, setComments] = useState(event.comentarios || []);
  const [suscribe, setSuscribe] = useState(false);
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [conferencistas, setConferencistas] = useState([]);
  const [facilitadores, setFacilitadores] = useState([]);
  const [newComment, setNewComment] = useState({
    comentario: "",
    eventId: "",
    userId: "",
  });

  let user = JSON.parse(localStorage.getItem("user"));

  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      comentario: e.target.value,
    });
  };

  useEffect(() => {
    const conferencistasActuales = event.participantes.filter((participante) => {
      return participante.role === "conferencista";
    });
    setConferencistas(conferencistasActuales);
  }, [event]);

  useEffect(() => {
    const facilitadoresActuales = event.participantes.filter((participante) => {
      return participante.role === "facilitador";
    });
    setFacilitadores(facilitadoresActuales);
  }, [event]);

  useEffect(() => {
    setComments(event.comentarios || []);
  }, [event.comentarios, onClose]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let facultades = [];
        for (let i = 0; i < event.facultades.length; i++) {
          const facultad = await getFacultadById(event.facultades[i]);
          facultades.push(facultad);
        }
        setFacultades(facultades);
      } catch (error) {
        setFacultades([]);
      }
    };

    fetchData();
  }, [event.facultades]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let programas = [];
        for (let i = 0; i < event.programas.length; i++) {
          const programa = await getProgramaById(event.programas[i]);
          programas.push(programa);
        }
        setProgramas(programas);
      } catch (error) {
        setFacultades([]);
      }
    };

    fetchData();
  }, [event.programas]);

  const handleAddComment = () => {
    let fecha = new Date();
    let año = fecha.getFullYear();
    let mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    let dia = ("0" + fecha.getDate()).slice(-2);

    let fechaFormateada = `${año}-${mes}-${dia}`;

    if (newComment.comentario.trim() !== "") {
      const commentToAdd = {
        contenido: newComment.comentario,
        username: user.nombre,
        fecha: fechaFormateada,
        eventId: event.id,
        userId: user.id,
      };

      const response = saveComment(event.id, commentToAdd);

      if (response) {
        setComments((prevComments) => [...prevComments, commentToAdd]);

        event.comentarios = [...(event.comentarios || []), commentToAdd];

        setNewComment({
          comentario: "",
          eventId: "",
          userId: "",
        });
      }
    }
  };

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await getEventById(user.id);
        const isSubscribed = response.some((e) => e.id == event.id);
        setSuscribe(isSubscribed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyEvents();
  }, [event.id, user.id]);

  const handleSubscribe = async (eventToUpdate, user) => {
    try {
      const participantesActuales = eventToUpdate.participantes || [];

      const participanteExistente = participantesActuales.some(
          (participante) => participante.id === user.id
      );

      if (!participanteExistente) {
        const nuevoParticipante = {
          id: user.id,
          usuario: user,
          role: "asistente",
        };

        const nuevosParticipantes = [
          ...participantesActuales,
          nuevoParticipante,
        ];

        const response = await updateEvent(eventToUpdate.id, {
          ...eventToUpdate,
          participantes: nuevosParticipantes,
        });

        if (response) {
          setSuscribe(true);
          onMsg("Inscripción exitosa");
          handleClose();
        }
      } else {
        const response = await updateEvent(eventToUpdate.id, {
          ...eventToUpdate,
        });
        if (response) {
          setSuscribe(true);
          onMsg("Inscripción exitosa");
          handleClose();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDesuscribe = async (eventToUpdate, user) => {
    try {
      const participantesActuales = eventToUpdate.participantes || [];

      const nuevosParticipantes = participantesActuales.filter(
          (p) => p.id !== user.id
      );

      const response = await updateEvent(eventToUpdate.id, {
        ...event,
        participantes: nuevosParticipantes,
      });

      if (response) {
        setSuscribe(false);
        onMsg("Anulación exitosa");
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setProgramas([]);
    setFacultades([]);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl transform transition-all h-[850px] max-w-4xl overflow-y-scroll">
          <div className="flex flex-col p-6">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex gap-2 mb-3 flex-wrap w-full items-center">
                {event.categoria.map((categoria, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                  {categoria}
                </span>
                ))}
                <button
                    onClick={handleClose}
                    className=" text-black text-3xl px-4 py-2 rounded-md absolute right-0"
                >
                  <IoClose className="mr-3" />
                </button>
              </div>
              <div className="w-full block relative flex flex-row gap-5 h-auto rounded overflow-hidden">
                <img
                    className="object-cover object-center w-[450px] max-h-[500px]"
                    src={event.imagen || "default-image-url.jpg"}
                    alt={event.titulo}
                />
                <div className="">
                  <h2 className="text-blue-800 text-xs tracking-widest title-font mb-10">
                    {event.fecha}
                  </h2>
                  <h2 className="text-blue-900 title-font text-2xl font-medium">
                    {event.titulo}
                  </h2>
                  <p className="mt-1 text-gray-700">{event.descripcion}</p>
                  <section className="mt-4">
                    {facultades.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-blue-900 text-lg font-medium mb-2">
                            Facultades
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {facultades.map((facultad, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                                >
                          {facultad.nombre}
                        </span>
                            ))}
                          </div>
                        </div>
                    )}
                    {programas.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-blue-900 text-lg font-medium mb-2">
                            Programas
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {programas.map((programa, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                                >
                          {programa.nombre}
                        </span>
                            ))}
                          </div>
                        </div>
                    )}
                    {conferencistas.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-blue-900 text-lg font-medium mb-2">
                            Conferencistas
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {conferencistas.map((participante, index) =>
                                    participante.role === "conferencista" ? (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                                        >
                            {participante.usuario.nombre}
                          </span>
                                    ) : null
                            )}
                          </div>
                        </div>
                    )}
                    {facilitadores.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-blue-900 text-lg font-medium mb-2">
                            Facilitadores
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {facilitadores.map((participante, index) =>
                                    participante.role === "facilitador" ? (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                                        >
                            {participante.usuario.nombre}
                          </span>
                                    ) : null
                            )}
                          </div>
                        </div>
                    )}
                  </section>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <h2 className="text-blue-900 text-lg font-medium mb-4">Comentarios</h2>
              <div
                  className="flex-grow overflow-y-auto mb-4 pr-2"
                  style={{ maxHeight: "300px" }}
              >
                {comments && comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div
                            key={index}
                            className="p-4 mb-4 border rounded-lg shadow-sm bg-white"
                        >
                          <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                          <span className="text-lg font-semibold">
                            {comment.username.charAt(0)}
                          </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <p className="font-medium text-gray-900">
                                  {comment.username}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {comment.fecha}
                                </p>
                              </div>
                              <p className="mt-2 text-gray-700">
                                {comment.contenido}
                              </p>
                            </div>
                          </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No hay comentarios aún.</p>
                )}
              </div>
              <div className="flex mb-4">
                <input
                    className="flex-grow h-10 p-2 border border-gray-300 rounded-l-md"
                    type="text"
                    value={newComment.comentario}
                    onChange={handleCommentChange}
                    placeholder="Añadir un comentario"
                />
                <button
                    onClick={handleAddComment}
                    className="h-10 px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-300 text-right flex justify-between items-center">
            <div className="flex items-center">
              <FaUser className="text-gray-600" />
              <p className="text-gray-600 ml-2 hover:text-gray-800 hover:font-semibold">
                {event.participantes?.length || 0}
                <Link to={`/Participants/${event.id}`} className="ml-1">
                  Participantes
                </Link>
              </p>
            </div>
            <div className="flex gap-3">
              {user && user.rol === "ADMIN" && (
                  <Link className="w-full" to={`/InfoPlanView/${event.id}`}>
                    <button className="h-10 w-10 text-white rounded-md">
                      <MdOutlineModeEditOutline className="mr-3 text-black text-2xl" />
                    </button>
                  </Link>
              )}
              {new Date(event.fecha) > new Date() &&
                  (suscribe ? (
                      <button
                          className="w-36 h-10 bg-red-500 hover:bg-red-700 text-white rounded-md"
                          onClick={() => handleDesuscribe(event, user)}
                      >
                        Anular
                      </button>
                  ) : (
                      <button
                          className="w-40 h-10 bg-green-700 text-white rounded-md hover:bg-green-700"
                          onClick={() => handleSubscribe(event, user)}
                      >
                        Inscribirse
                      </button>
                  ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default EventModal;
