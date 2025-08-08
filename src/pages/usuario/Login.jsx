import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/utm.webp";
import { baseRoute, VERSION } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";
import { useAuthActions } from "../../hooks/useAuthActions";
import LoginForm from "../../components/formularios/LoginForm";
import logo from "../../assets/logo_claro.webp";
import LoadingScreen from "../../components/shared/LoadingScreen";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { handleLogin, isLoading } = useAuthActions(navigate);

    // Mover la lógica de navegación a un efecto secundario
    useEffect(() => {
        if (isAuthenticated) {
            navigate(baseRoute);
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(usuario, password);
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
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
                    <LoginForm
                        usuario={usuario}
                        setUsuario={setUsuario}
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                        handleSubmit={handleSubmit}
                    />
                    <div className="text-center mt-4">
                        <Link to="/register" className="text-white hover:underline">¿No tienes una cuenta? Regístrate</Link>
                    </div>
                </div>

                <footer className="absolute bottom-4 w-full text-center text-white text-[0.6rem]">
                    <p>Desarrollado por Arteaga Carlos y Rodriguez Jostin</p>
                    <p>Versión {VERSION}</p>
                </footer>
            </div>
        </>
    );
};

export default Login;
