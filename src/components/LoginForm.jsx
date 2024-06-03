import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../services/loginUsers';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await auth(username, password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/Events');
            } else {
                setErrorMessage("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            setErrorMessage("Usuario o contraseña incorrectos");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <input type="text" placeholder='Ingrese su usuario' className='w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md mb-8' value={username} onChange={handleUsername}/>
                <input type="password" placeholder='Ingrese su contraseña' className='w-80 h-12 p-2 border-2 border-gray-300 rounded-lg shadow-md mb-2' value={password} onChange={handlePassword}/>
                {errorMessage && (
                    <div className='text-red-500 mt-4'>{errorMessage}</div>
                )}
                <button type='submit' className='w-40 h-12 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all mt-6'>
                    Ingresar
                </button>
            </form>
        </>
    );

}

export default LoginForm;
