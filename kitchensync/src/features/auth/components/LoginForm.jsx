import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { handleLogin } from "../logic";
import {areFieldsFilled} from "../../../shared/utils/validate.js";

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!areFieldsFilled(credentials)) {
            setError("Por favor, ingresa tu usuario y contraseña.");
            setTimeout(()=>setError(null), 3000);
            setIsLoading(false);
            return;
        }

        const result = await handleLogin(credentials,navigate);

        if (!result.success) {
            setError(result.message);
            setTimeout(()=>setError(null), 3000);
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <Input
                name="email"
                placeholder="Correo electrónico"
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

            <div className="h-5 min-h-[20px]">
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Button className="w-full" size="lg" disabled={isLoading} type="submit">
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
        </form>
    );
};

export default LoginForm;