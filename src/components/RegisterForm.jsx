// RegisterForm.js
import { useEffect, useState } from "react";
import findEmpleado from "../services/findEmpleado";
import registerUser from "../services/registerUser";
import getCity from "../services/getCity";
import getCityById from "../services/getCityById";
import registerEmpleado from "../services/registerEmpleado";

const RegisterForm = () => {

    const [userExist, setUserExist] = useState(false);
    const [shouldRegisterUser, setShouldRegisterUser] = useState(false);
    const [codigo, setCodigo] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [institucion, setInstitucion] = useState("");
    const [correo, setCorreo] = useState("");
    const [city, setCity] = useState([]);
    const [responseUser, setResponseUser] = useState(null);

    useEffect(() => {
        const fetchCity = async () => {
            const response = await getCity();
            setCity(response);
        }
        fetchCity();
    }, []);

    const handleUserExist = async (event) => {
        const newCodigo = event.target.value;
        setCodigo(newCodigo);
        if (newCodigo === "") {
            setUserExist(false);
            setShouldRegisterUser(false);
            setResponseUser(null);
            return;
        }

        const response = await findEmpleado(newCodigo);

        if (response) {
            setUserExist(true);
            setShouldRegisterUser(false);
            setResponseUser(response);
        } else {
            setShouldRegisterUser(true);
            setUserExist(false);
            setResponseUser(null);
        }
    }

    const handleExistSubmit = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            await registerEmpleado(nombreUsuario, password, responseUser)
            window.location.href = '/';
        }
    }

    const handleNotExistSubmit = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            
            const city = await getCityById(ciudad);

            const user = {
                "id": codigo,
                "password": password,
                "rol": "VIEWER",
                "nombreUsuario": nombreUsuario,
                "nombre": nombre,
                "tipoRelacion": institucion,
                "email": correo,
                "ciudad": city,
            };

            try {
                await registerUser(user);
                window.location.href = '/';
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
            }
        }
    }

    return (
        <>
            <div className="flex justify-center items-center mb-10">
                <input type="text" placeholder="Ingrese identificación" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={codigo} onChange={handleUserExist}/>
            </div>
            <div>
                {userExist ? (
                    <form onSubmit={handleExistSubmit}>
                        <div className="flex flex-col items-center gap-4">
                            <input type="text" placeholder="Ingrese su nombre de usuario" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)}/>
                            <input type="password" placeholder="Ingrese la contraseña para su nueva cuenta" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input type="password" placeholder="Confirme la contraseña" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <button className="w-40 h-12 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">Crear cuenta</button>
                        </div>
                    </form>
                ) : shouldRegisterUser ? (
                    <form onSubmit={handleNotExistSubmit}>
                        <div className="flex flex-col items-center gap-4">
                            <input type="text" placeholder="Ingrese su nombre de usuario" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)}/>
                            <input type="text" placeholder="Ingrese su nombre completo" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                            <select className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
                                <option value="">Seleccione su ciudad</option>
                                {city.map((city, index) => (
                                    <option key={index} value={city.codigo}>
                                        {city.nombre}
                                    </option>
                                ))}
                            </select>
                            <input type="text" placeholder="Ingrese su relación con la institución" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={institucion} onChange={(e) => setInstitucion(e.target.value)}/>
                            <input type="text" placeholder="Ingrese su correo electrónico" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                            <input type="password" placeholder="Ingrese su contraseña" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input type="password" placeholder="Confirme su contraseña" className="w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <button type="submit" className="w-40 h-12 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">Registrarse</button>
                        </div>
                    </form>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );

}

export default RegisterForm;
