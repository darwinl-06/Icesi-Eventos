import { useState } from 'react';
import bgImage from '../images/fondologin.jpg';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    const handleRegister = () => {
        setIsRegister(!isRegister);
    }
    return (
        <div
            className='flex justify-center items-center h-screen'
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div
                className={`flex flex-col items-center border-x-2 border-y-2 rounded-2xl bg-white neumorphism-container transition-all duration-300 ease-in-out ${isRegister ? 'flex flex-shrink-0' : 'w-96 h-1/2.5'}`}>
                <h1 className='mt-4 text-black font-semibold text-3xl'>
                    {isRegister ? 'Registro de Usuario' : 'Inicio de sesión'}
                </h1>
                <div className='w-full px-4 mt-4'>
                    <div className='mt-10'>
                        {isRegister ? (
                            <RegisterForm />
                        ) : (
                            <LoginForm />
                        )}
                        <div className='flex flex-col items-center'>
                            <p className='mt-5'>{isRegister ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}<Link to='#' className='text-blue-700 hover:text-blue-400 transition-all ml-1' onClick={handleRegister}>{isRegister ? 'Iniciar sesión' : 'Registrate!'}</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
