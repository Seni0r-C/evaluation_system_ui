import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import logo from "../../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import MessageDialog from "../components/MessageDialog";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

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

    return (<>
        <LoadingScreen isLoading={isLoading} />
        <MessageDialog message={errorMessage} onClose={handleCerrar} isOpen={showMessage} />
        <div className="flex flex-col md:justify-center md:items-center h-screen bg-gradient-to-r md:from-[#009fe3] md:to-[#004071] bg-white">

            <div className="max-w-md w-full bg-white p-8 rounded-lg md:shadow-2xl pt-14 md:pt-8">
                <div className="mb-6 text-center">
                    <img
                        src={logo}
                        alt="Logo de Recaudación - Portoviejo innova"
                        className="mx-auto w-96 h-32 object-contain"
                    />
                </div>
                <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="cedula"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Cédula
                        </label>
                        <input
                            type="number"
                            id="cedula"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            required
                            inputMode="numeric" // Muestra un teclado numérico con flecha para avanzar
                            onKeyDown={(e) => {
                                if (e.key == 'Enter') {
                                    document.getElementById("password").focus(); // Mover el foco al campo de contraseña
                                }
                            }}
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Alterna entre 'text' y 'password'
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleShowPassword}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
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
                        className="w-full bg-gradient-to-br from-[#009fe3] to-[#004071] text-white py-4 md:py-2 text-lg md:text-base font-bold md:font-normal rounded-md hover:from-[#166a8e] hover:to-[#004071] focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-105"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
            <footer className="mt-4 mx-7 text-center text-[#004071] md:text-white text-xs">
                <p>Desarrollado por el Equipo de Tecnología de Portocomercio EP</p>
                <p>Integrado por Henry Fuertes, Hugo Molina, Carlos Arteaga, Marco Giler, y César Ruiz</p>
                {/* <p>{VERSION}</p> */}
            </footer>
        </div>
    </>
    );
}

export default Login;
