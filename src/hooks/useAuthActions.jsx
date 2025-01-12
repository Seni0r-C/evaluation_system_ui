import { useState } from "react";
import { login, fetchUserData } from "../services/authService";
import { useAuth } from "./useAuth";
import { useMessage } from "./useMessage";

export const useAuthActions = (updateUser, navigate) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated } = useAuth();
    const { showError } = useMessage();

    const handleLogin = async (username, password) => {
        try {
            setIsLoading(true);
            const response = await login(username, password);
            const data = response.data;

            if (data.exito) {
                localStorage.setItem("token", data.datos);
                localStorage.setItem("tokenCreationTime", new Date().getTime());

                const userInfo = await fetchUserData(data.datos);
                if (userInfo.data.exito) {
                    setIsAuthenticated(true);
                    updateUser(userInfo.data.datos);
                    navigate("/");
                } else {
                    throw new Error(userInfo.data.mensaje || "Error al obtener información del usuario.");
                }
            } else {
                throw new Error(data.mensaje || "Error en la autenticación.");
            }
        } catch (error) {
            showError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, isLoading };
};
