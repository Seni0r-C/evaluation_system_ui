import { useContext, useState } from "react";
import { login, fetchUserData } from "../services/authService";
import { useAuth } from "./useAuth";
import { useMessage } from "./useMessage";
import UserContext from "../context/UserContext";
import { baseRoute } from "../utils/constants";

export const useAuthActions = (navigate) => {
    const { updateUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated } = useAuth();
    const { showError } = useMessage();

    const handleLogin = async (username, password) => {
        try {
            setIsLoading(true);
            const response = await login(username, password);
            const data = response.data;

            if (data.exito == true) {
                localStorage.setItem("token", data.datos);
                localStorage.setItem("tokenCreationTime", new Date().getTime());

                const userInfo = await fetchUserData(data.datos);
                if (userInfo.data.exito == true) {
                    setIsAuthenticated(true);
                    updateUser(userInfo.data.datos);
                    navigate(baseRoute);
                } else {
                    throw new Error(userInfo.data.mensaje || "Error al obtener información del usuario.");
                }
            } else {
                throw new Error(data.mensaje || "Error en la autenticación.");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.mensaje || error.message;
            showError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, isLoading };
};
