import axios from "axios";
import { API_ROUTES } from "../../../shared/constants/api";
import {jwtDecode} from "jwt-decode";

const baseUrl = `${API_ROUTES.BASE_URL}${API_ROUTES.AUTH.LOGIN}`

//Manejo de la API de autenticación
export const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);

    if(response.data.token){
        const decoded = jwtDecode(response.data.token);

        return{
            ...response.data,
            decodedToken:{
                role: decoded.role,
                id: decoded.id,
                sub: decoded.sub,
                iat: decoded.iat,
                exp: decoded.exp,
            }
        }
    }
    // Si no hay token, simplemente retornamos los datos de la respuesta
    return response.data;
}