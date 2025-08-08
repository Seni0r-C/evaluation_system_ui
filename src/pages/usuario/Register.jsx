import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosConfig';
import { useMessage } from '../../hooks/useMessage';
import background from '../../assets/utm.webp';
import logo from '../../assets/logo_claro.webp';

const Register = () => {
    const [formData, setFormData] = useState({
        cedula: '',
        usuario: '',
        password: ''
    });
    const { showMsg } = useMessage();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/register', formData);
            showMsg({ typeMsg: 'success', message: response.data.mensaje || 'Usuario registrado exitosamente' });
            navigate('/login');
        } catch (error) {
            showMsg({ typeMsg: 'error', message: error.response?.data?.mensaje || 'Error al registrar el usuario' });
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen relative items-start md:items-center md:justify-center">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${background})`,
                    zIndex: -1,
                }}
            >
                <div
                    style={{
                        backdropFilter: "blur(1px) brightness(0.5)",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>

            <div className="mx-8 flex md:w-1/3 justify-center items-center mr-5 md:mt-0 mt-10">
                <img
                    src={logo}
                    alt="Logo de la Universidad Técnica de Manabí"
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className="max-w-lg w-full md:w-1/2 md:mt-0 mt-5 bg-white bg-opacity-10 p-10 rounded-lg shadow-xl backdrop-filter backdrop-blur-md">
                <form onSubmit={handleSubmit} className="text-white">
                    <div className="mb-4">
                        <label htmlFor="cedula" className="block font-medium mb-2 text-white">Cédula</label>
                        <input
                            type="text"
                            id="cedula"
                            name="cedula"
                            placeholder="Ingrese su cédula"
                            value={formData.cedula}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black placeholder-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="usuario" className="block font-medium mb-2 text-white">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="No es necesario el '@utm.edu.ec'"
                            value={formData.usuario}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black placeholder-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block font-medium mb-2 text-white">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingrese su contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pr-12 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black placeholder-gray-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#f8cf12] text-[#4c4c4a] py-3 font-medium rounded hover:bg-[#f7d22d] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                    >
                        Registrarse
                    </button>
                    <div className="text-center mt-4">
                        <Link to="/login" className="text-white hover:underline">¿Ya tienes una cuenta? Inicia sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;