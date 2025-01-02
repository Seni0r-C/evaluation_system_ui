import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import logo from "../assets/logo_inicio.png";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import MessageDialog from "../components/MessageDialog";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import background from "../assets/utm.webp";
import { RutaRaiz, VERSION } from "../utils/constants";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../services/axiosConfig";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de la contraseña
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const { updateUser } = useContext(UserContext);
    const icon = "error";

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    if (isAuthenticated) {
        navigate(RutaRaiz);
    }

    async function login(username, password) {
        const cleanUsername = username.replace(/@utm\.edu\.ec$/, '');
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(`/auth/login`, {
                usuario: cleanUsername,
                password: password,
            });

            const data = response.data;

            setIsLoading(false);
            if (data.exito) {
                // Guardar el token en localStorage
                localStorage.setItem('token', data.datos);
                // Guardar la fecha de creación del token en localStorage
                localStorage.setItem('tokenCreationTime', new Date().getTime());

                const info = await axiosInstance.get(`/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${data.datos}`,
                        },
                    },
                );

                if (info.data.exito == true) {
                    // Marcar como autenticado
                    setIsAuthenticated(true);
                    // Guardar el nombre del usuario en localStorage
                    updateUser(info.data.datos);
                    // Navegar a la página principal
                    navigate(RutaRaiz);
                } else {
                    const msg = info?.data?.mensaje;
                    alert('Error al iniciar sesión'+(msg??false?": "+msg:''));
                }
            } else {
                // Manejar errores del servidor
                console.error(data.mensaje);
                alert(data.mensaje);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            // Manejar errores de red u otros
            setErrorMessage(error.response.data.mensaje || error.message);
            setShowMessage(true);
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
            <MessageDialog message={errorMessage} onClose={handleCerrar} isOpen={showMessage} iconType={icon} />
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
                                htmlFor="usuario"
                                className="block font-medium mb-2 text-white"
                            >
                                Usuario
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                placeholder="No es necesario el ''@utm.edu.ec''"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                className="w-full px-4 py-2 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black placeholder-gray-600"
                                required
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
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 pr-12 border border-transparent bg-opacity-70 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-black placeholder-gray-600"
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
                            className="w-full bg-[#f8cf12] text-[#4c4c4a] py-3 font-medium rounded hover:bg-[#f7d22d] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400"
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
