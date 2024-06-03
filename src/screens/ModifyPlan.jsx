import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import allFacultades from '../services/allFacultades';
import getProgramas from '../services/getProgramas';
import getUsers from '../services/getUsers';
import { Link } from 'react-router-dom';
import getEventById from "../services/getEventById";
import updateEvent from "../services/updateEvent";

function ModifyPlan() {

    const [titulo, setTitulo] = useState("");
    const [categorias, setCategorias] = useState([""]);
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [estado, setEstado] = useState(true);
    const [nombreEvento, setNombreEvento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [city, setCity] = useState("");
    const [facultades, setFacultades] = useState([]);
    const [facultadesSeleccionadas, setFacultadesSeleccionadas] = useState([]);
    const [programas, setProgramas] = useState([]);
    const [programasSeleccionados, setProgramasSeleccionados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [rolesSeleccionados, setRolesSeleccionados] = useState({});
    const { id } = useParams();

    const handleRoleChange = (index, role, userCode) => {
        setRolesSeleccionados(prevRoles => ({
            ...prevRoles,
            [index]: {
                userCode: userCode,
                role: role
            }
        }));
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                console.log(data);
                setTitulo(data.titulo ? data.titulo : '');
                setCategorias(data.categoria ? data.categoria : []);
                setDescripcion(data.descripcion ? data.descripcion : '');
                setFecha(data.fecha ? data.fecha : '');
                if (data.lugarDelEvento) {
                    setNombreEvento(data.lugarDelEvento.name ? data.lugarDelEvento.name : '');
                    setDireccion(data.lugarDelEvento.direccion ? data.lugarDelEvento.direccion : '');
                    setCity(data.lugarDelEvento.city ? data.lugarDelEvento.city : '');
                }
                setEstado(data.estado ? data.estado : true);
                setFacultadesSeleccionadas(data.facultades ? data.facultades : []);
                setProgramasSeleccionados(data.programasSeleccionados ? data.programasSeleccionados : []);
                setRolesSeleccionados(data.participantes ? data.participantes : {});
            } catch (error) {
                console.error("Existe un error al obtener el evento", error);
            }
        };

        fetchEvent();
    }, [id]);

    useEffect(() => {
        const fetchFacultades = async () => {
            try {
                const data = await allFacultades();
                setFacultades(data);
            } catch (error) {
                console.error("Existe un error al obtener las facultades", error);
            }
        };

        fetchFacultades();
    }, []);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsers();
                setUsuarios(data);
            } catch (error) {
                console.error("Existe un error al obtener los usuarios", error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleCategoriaChange = (index, value) => {
        const newCategorias = [...categorias];
        newCategorias[index] = value;
        setCategorias(newCategorias);
    };

    const handleAddCategoria = () => {
        setCategorias([...categorias, ""]);
    };

    const handleFacultadChange = (isChecked, codigoFacultad) => {
        if (isChecked) {
            setFacultadesSeleccionadas([...facultadesSeleccionadas, codigoFacultad]);
            const fetchData = async () => {
                try {
                    const response = await getProgramas(codigoFacultad);
                    const updatedResponse = response.map(programa => ({
                        ...programa,
                        codigoFacultad: codigoFacultad
                    }));
                    setProgramas(prevProgramas => [...prevProgramas, ...updatedResponse]);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        } else {
            setFacultadesSeleccionadas(facultadesSeleccionadas.filter(facultad => facultad !== codigoFacultad));
            setProgramas(prevProgramas => prevProgramas.filter(programa => programa.codigoFacultad !== codigoFacultad));
        }
    };


    const handleProgramaChange = (isChecked, codigoPrograma) => {
        if (isChecked) {
            setProgramasSeleccionados([...programasSeleccionados, codigoPrograma]);
        } else {
            setProgramasSeleccionados(programasSeleccionados.filter(facultad => facultad !== codigoPrograma));
        }
    }

    const handleRemoveCategoria = (index) => {
        const newCategorias = categorias.filter((_, i) => i !== index);
        setCategorias(newCategorias);
    };

    const prepararDatosParticipantes = (rolesSeleccionados) => {
        return Object.keys(rolesSeleccionados).map(key => ({
            id: rolesSeleccionados[key].userCode,
            role: rolesSeleccionados[key].role
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newParticipantes = prepararDatosParticipantes(rolesSeleccionados);
        console.log(newParticipantes);
        const newEvent = {
            titulo,
            categoria: categorias,
            descripcion,
            fecha,
            estado,
            lugarDelEvento: {
                name: nombreEvento,
                direccion,
                city,
            },
            facultades: facultadesSeleccionadas,
            programas: programasSeleccionados,
            participantes: newParticipantes,
        };
        await updateEvent(id, newEvent);
    };

    return (
        <div className=''>
            <Sidebar />
            <div className='flex-grow flex justify-center p-24 ml-24'>
                <form onSubmit={handleSubmit} className="w-[500px] my-10">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">Título</label>
                        <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Categorías</label>
                        {categorias.map((categoria, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input type="text" value={categoria} onChange={(e) => handleCategoriaChange(index, e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                <button type="button" onClick={handleAddCategoria} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">+</button>
                                {categorias.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveCategoria(index)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">-</button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
                        <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">Fecha</label>
                        <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">Facultades</label>
                        <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            {facultades.map((facultad, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`facultad-${index}`}
                                        value={facultad.nombre}
                                        onChange={(e) => handleFacultadChange(e.target.checked, facultad.codigo)}
                                        className="mr-2"
                                        checked={facultad.id === facultadesSeleccionadas.find(facultadSeleccionada => facultadSeleccionada === facultad.codigo) ? false : true}
                                    />
                                    <label htmlFor={`facultad-${index}`}>{facultad.nombre}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {programas && programas.length > 0
                        ? (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programas">Programas</label>
                                <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    {programas.map((programa, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                id={`programa-${index}`}
                                                value={programa.nombre}
                                                onChange={(e) => handleProgramaChange(e.target.checked, programa.codigo)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`programa-${index}`}>{programa.nombre}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                        : null
                    }
                    {usuarios && usuarios.length > 0 ? (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programas">Participantes</label>
                            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                {usuarios.map((participante, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            id={`participante-${index}`}
                                            value={participante.nombre}
                                            className="mr-2"
                                            defaultChecked={rolesSeleccionados.length > 0 && rolesSeleccionados.some((rol) => rol.id === participante.id)}
                                        />

                                        <label htmlFor={`participante-${index}`} className="mr-4">{participante.nombre}</label>
                                        <select
                                            onChange={(e) => handleRoleChange(index, e.target.value, participante.id)}
                                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            defaultValue={rolesSeleccionados.length > 0 && rolesSeleccionados.map((rol) => rol.id == participante.id ? rol.role : 'default')}
                                        >
                                            <option value="default">Selecciona un rol</option>
                                            <option value="asistente">Asistente</option>
                                            <option value="conferencista">Conferencista</option>
                                            <option value="facilitador">Facilitador</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null
                    }
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">Estado</label>
                        <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value === 'true')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lugarDelEvento">Lugar del Evento</label>
                        <input type="text" id="lugarDelEventoNombre" placeholder="Nombre del lugar" value={nombreEvento} onChange={(e) => setNombreEvento(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <input type="text" id="lugarDelEventoDireccion" placeholder="Dirección del lugar" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <input type="text" id="lugarDelEventoCiudad" placeholder="Ciudad del lugar" value={city} onChange={(e) => setCity(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <Link to={'/Events'}>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Volver
                            </button>
                        </Link>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Modificar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModifyPlan;