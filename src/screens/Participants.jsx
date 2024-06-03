import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import getEventById from "../services/getEventById";
import { useParams, Link } from 'react-router-dom';

const Participants = () => {
    const { idEvent } = useParams();
    const [tituloEvento, setTituloEvento] = useState("");
    const [participantes, setParticipantes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const evento = await getEventById(idEvent);
                setTituloEvento(evento.titulo);
                setParticipantes(evento.participantes);
            } catch (error) {
                setParticipantes([]);
            }
        };

        fetchData();
    }, [idEvent]);

    return (
        <div className="flex min-h-screen">
            <Sidebar className="w-72" />
            <div className="flex-grow p-4 pt-28">
                <h1 className="text-2xl font-semibold text-center mb-5 bg-gray-200 py-4 rounded-lg">
                    Participantes del evento {tituloEvento}
                </h1>
                <Link to='/Events' className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 fixed right-0 bottom-0 mb-10 mr-10">
                    Regresar a los eventos
                </Link>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre del Participante
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Correo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo de relacion
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ciudad
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {participantes.map((participante, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{participante.usuario.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{participante.usuario.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{participante.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{participante.usuario.tipoRelacion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{participante.usuario.ciudad.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Participants;
