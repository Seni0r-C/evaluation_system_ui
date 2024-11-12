import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import logo from "../../assets/logo_utm.webp";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import MessageDialog from "../components/MessageDialog";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import background from "../../assets/utm.webp";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de la contraseña
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    // const navigate = useNavigate();

    // const login = async (usuario, password) => {
    //     setIsLoading(true);
    //     try {
    //         const contrasena = CryptoJS.MD5(password).toString();
    //         const response = await axios.post(
    //             `${API_URL}/login/auth`,
    //             {
    //                 usuario,
    //                 contrasena,
    //             },
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //         setIsLoading(false);

    //         const data = response.data;

    //         if (response.status === 200 && response.data.exito == true) {
    //             setIsLoading(true);
    //             const userInfo = await axios.get(`${API_URL}/login/infoUsuario`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     'Authorization': `Bearer ${data.datos}`,
    //                 },
    //             });
    //             setIsLoading(false);
    //             if (userInfo.status === 200 && userInfo.data.exito == true) {

    //                 //Verificar si es un recaudador
    //                 setIsLoading(true);
    //                 const usertype = await axios.get(`${API_URL}/sgp/tipoUsuario/${usuario}`, {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         'Authorization': `Bearer ${data.datos}`,
    //                     },
    //                 });
    //                 setIsLoading(false);
    //                 if (usertype.data.datos.innova == null) {
    //                     setErrorMessage(`Usted no tiene acceso a este sistema, o no es Recaudador`);
    //                     setShowMessage(true);
    //                     return;
    //                 }

    //                 if (password == usuario) {
    //                     navigate('/cambiar-contrasena', { state: { token: data.datos } });
    //                 } else {
    //                     const currentTime = new Date().getTime(); // Tiempo actual en milisegundos
    //                     localStorage.setItem("token", data.datos);
    //                     localStorage.setItem("tokenCreationTime", currentTime.toString());
    //                     localStorage.setItem("tipoUsuario", usertype.data.datos.innova);
    //                     localStorage.setItem("userInfo", JSON.stringify(userInfo.data.datos));
    //                     navigate('/');
    //                 }
    //             } else {
    //                 setErrorMessage(`Ocurrió un error al iniciar sesión. ${userInfo.data.mensaje}`);
    //                 setShowMessage(true);
    //             }
    //         } else {
    //             setErrorMessage(data.mensaje);
    //             setShowMessage(true);
    //         }
    //     } catch (error) {
    //         if (!error.response) {
    //             // Verificar si hay conexión a Internet
    //             const hasInternet = await checkInternetConnection();
    //             if (hasInternet) {
    //                 setErrorMessage("No se pudo conectar al servidor. Problemas de Internet.");
    //             } else {
    //                 setErrorMessage("Parece que tu conexión a Internet está fallando. Por favor, verifica tu conexión e inténtalo nuevamente.");
    //             }
    //         } else {
    //             setErrorMessage(`Ocurrió un error.${error.message}`);
    //         }
    //         setIsLoading(false);
    //         console.log("Error al iniciar sesión: ", error);
    //         setShowMessage(true);
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // login(usuario, password);
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
            <div className="flex flex-col md:flex-row h-screen relative items-center justify-center">
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
                <div className="hidden md:flex md:w-1/3 justify-center items-center mr-5">
                    <img
                        src={logo}
                        alt="Logo de al Universidad Técnica de Manabí"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Contenedor del formulario a la derecha */}
                <div className="max-w-lg w-full md:w-1/2 bg-white bg-opacity-10 p-10 rounded-lg md:shadow-xl backdrop-filter backdrop-blur-md md:backdrop-blur-lg">
                    <form onSubmit={handleSubmit} className="text-white">
                        <div className="mb-4">
                            <label
                                htmlFor="cedula"
                                className="block font-medium mb-2 text-white"
                            >
                                CÉDULA
                            </label>
                            <input
                                type="number"
                                id="cedula"
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
                    {/* <p>{VERSION}</p> */}
                </footer>
            </div>
        </>
    );
}

export default Login;
