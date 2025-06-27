import {useState} from "react";
import {handleRegister} from "../logic.js";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import Select from "../../../shared/ui/Select";
import {areFieldsFilled} from "../../../shared/utils/validate.js";
import {roles} from "../../../shared/constants/roles.js";

const RegisterForm = () =>
{
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role:"",
    })
    const roleOptions = [
        { value: roles.waiter, label: "Mesero" },
        { value: roles.cook, label: "Cocinero" }
    ];
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e)  =>  {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!areFieldsFilled(credentials)) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(null), 3000);
            setIsLoading(false);
            return;
        }

        const result = await handleRegister(credentials);

        if (!result.success) {
            setError(result.message);
            setTimeout(() => setError(null), 3000);
            return;
        }else{
            setSuccess("Usuario registrado exitosamente");
            setTimeout(() => setSuccess(null), 3000);
        }
        setIsLoading(false);
        setCredentials({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role:"",
        });

    }

    return(
        <div>
            <form onSubmit={onSubmit} className="space-y-6">
                <Input
                    name="firstName"
                    placeholder="Nombre"
                    value={credentials.firstName}
                    onChange={onChange}
                    disabled={isLoading}
                />
                <Input
                    name="lastName"
                    placeholder="Apellido"
                    value={credentials.lastName}
                    onChange={onChange}
                    disabled={isLoading}
                />
                <Input
                    name="email"
                    placeholder="Correo electrónico"
                    type="email"
                    value={credentials.email}
                    onChange={onChange}
                    disabled={isLoading}
                />
                <Input
                    name="password"
                    placeholder="Contraseña"
                    type="password"
                    value={credentials.password}
                    onChange={onChange}
                    disabled={isLoading}
                />

                <Select
                    name="role"
                    placeholder="Selecciona un rol"
                    value={credentials.role}
                    onChange={onChange}
                    options={roleOptions}
                    disabled={isLoading}
                />

                <div className="h-5 min-h-[20px]">
                    {error && (
                        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-2">
                            <p className="text-red-600 text-sm font-medium">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-2">
                            <p className="text-emerald-600 text-sm font-medium">{success}</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full bg-gradient-to-r from-yellow-500 via-blue-500 to-orange-500 hover:from-yellow-600 hover:via-blue-600 hover:to-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <div className="relative flex items-center justify-center gap-2">
                        {isLoading && (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        )}
                        <span className="text-lg">
                            {isLoading ? "Registrando..." : "Registrar"}
                        </span>
                    </div>
                    
                    <div className="absolute top-1 right-3 w-1 h-1 bg-white/70 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1 left-3 w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
                </button>
            </form>
        </div>
    )
}

export default RegisterForm;