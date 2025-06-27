import {register as registerAPI} from "./services/registerService.js";

export const handleRegister = async (credentials) => {
    try{
        await registerAPI(credentials)
        return {success: true, message: 'Usuario registrado exitosamente.'};
    }catch(error){
        console.log(error)
        return {success: false, message: "Error al registrar el usuario."};
    }
}

