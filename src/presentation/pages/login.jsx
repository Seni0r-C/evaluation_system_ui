import { useState } from "react";
import logo from "../../assets/logo_utm.webp";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import MessageDialog from "../components/MessageDialog";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import background from "../../assets/utm.webp";
import { VERSION } from "../../utils/constants";
import { useAuth } from "../../domain/useAuth";

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
        navigate('/');
    }

    function login(username, password) {
        console.log(username, password)
        setIsLoading(true);
        setIsAuthenticated(true);
        setIsLoading(false);
        navigate('/');
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
                        filter: 'blur(5px) brightness(0.7)',
                        zIndex: -1,
                    }}
                />

                {/* Contenedor del logo a la izquierda en pantallas grandes */}
                <div className="mx-8 flex md:w-1/3 justify-center items-center mr-5">
                    <img
                        src={logo}
                        alt="Logo de al Universidad Técnica de Manabí"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Contenedor del formulario a la derecha */}
                <div className="max-w-lg w-full md:w-1/2 md:bg-white md:bg-opacity-10 p-10 rounded-lg md:shadow-xl backdrop-filter md:backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="text-white">
                        <h2 className="text-center text-3xl font-semibold mb-4">
                            Sistema de Calificación de Titulación
                        </h2>
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
