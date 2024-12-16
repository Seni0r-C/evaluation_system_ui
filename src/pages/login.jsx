import { useState } from "react";
import logo from "../assets/logo_inicio.png";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import MessageDialog from "../components/MessageDialog";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import background from "../assets/utm.webp";
import { API_URL, RutaRaiz, VERSION } from "../utils/constants";
import { useAuth } from "../domain/useAuth";
import axios from "axios";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de la contraseña
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    if (isAuthenticated) {
        navigate(RutaRaiz);
    }

    async function login(username, password) {

        try {
            setIsLoading(true);
            const response = await axios.post(`${API_URL}/auth/login`, {
                email: username,
                password: password,
            });

            const data = response.data;

            setIsLoading(false);
            if (data.exito) {
                // Guardar el token en localStorage
                localStorage.setItem('token', data.datos);
                // Guardar la fecha de creación del token en localStorage
                localStorage.setItem('tokenCreationTime', new Date().getTime());

                const info = await axios.get(`${API_URL}/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${data.datos}`,
                        },
                    },
                );

                if (info.data.exito == true) {
                    // Guardar el nombre del usuario en localStorage
                    localStorage.setItem('userInfo', JSON.stringify(info.data.datos));
                }

                // Marcar como autenticado
                setIsAuthenticated(true);
                // Navegar a la página principal
                navigate(RutaRaiz);
            } else {
                // Manejar errores del servidor
                console.error(data.mensaje);
                alert(data.mensaje);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            // Manejar errores de red u otros
            console.error('Error de conexión:', error);
            alert('Error de conexión. Por favor, intenta de nuevo. ' + error);
            setIsLoading(false);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(usuario, password);
    };

    const handleCerrar = () => {
        setErrorMessage('');
        setShowMessage(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Alterna la visibilidad de la contraseña
    };

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <MessageDialog message={errorMessage} onClose={handleCerrar} isOpen={showMessage} />
            <div className="flex flex-col md:flex-row h-screen relative items-start md:items-center md:justify-center">
                {/* Fondo con imagen difuminada */}
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${background})`,
                        zIndex: -1,
                    }}
                >
                    <div
                        style={{
                            backdropFilter: 'blur(5px) brightness(0.5)',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>

                {/* Contenedor del logo a la izquierda en pantallas grandes */}
                <div className="mx-8 flex md:w-1/3 justify-center items-center mr-5 md:mt-0 mt-10">
                    <img
                        src={logo}
                        alt="Logo de al Universidad Técnica de Manabí"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Contenedor del formulario a la derecha */}
                <div className="max-w-lg w-full md:w-1/2 md:bg-white md:bg-opacity-10 p-10 rounded-lg md:shadow-xl backdrop-filter md:backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="text-white">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block font-medium mb-2 text-white"
                            >
                                CORREO
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                className="w-full px-4 py-2 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black"
                                required
                                inputMode="numeric"
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        document.getElementById("password").focus();
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block font-medium mb-2 text-white"
                            >
                                CONTRASEÑA
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 pr-12 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-800 hover:text-black"
                                >
                                    {showPassword ? (
                                        <FaRegEyeSlash />
                                    ) : (
                                        <FaRegEye />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#ffaf36] to-[#ffd659] text-[#3e3e3e] py-3 font-bold rounded-md hover:from-[#ffc163] hover:to-[#ffdf7e] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <footer className="absolute bottom-4 w-full text-center text-white text-xs">
                    <p>Desarrollado por Arteaga Carlos y Rodriguez Jostin</p>
                    <p>Versión {VERSION}</p>
                </footer>
            </div>
        </>
    );
}

export default Login;
