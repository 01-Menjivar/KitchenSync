import { login as loginApi } from "./services/authService";
import { useAuthStore } from "./store.js";
import {roles} from "../../shared/constants/roles.js";

export const handleLogin = async (credentials,navigate) => {
    try {
        const user = await loginApi(credentials)
        useAuthStore.getState().setUser(user)

        if (user.decodedToken) {
            switch (user.decodedToken.role) {
                case roles.admin:
                    navigate("/admin/tables");
                    break;
                case roles.waiter:
                    navigate("/waiter/dashboard");
                    break;
                case roles.cook:
                    navigate("/cook/dashboard");
                    break;
                default:
                    navigate("/");
            }
        }

        return { success: true };
    } catch (error){
        console.log(error)
        return { success: false, message: "Credenciales incorrectas" }
    }
};


