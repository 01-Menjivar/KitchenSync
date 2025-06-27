import { IconChefHatFilled } from '@tabler/icons-react';
import LoginForm from "./LoginForm";

const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full mb-4 shadow-lg">
                    <span className="text-2xl">
                        <IconChefHatFilled size={45} color="white" />
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Kitchen Sync</h1>
                <p className="text-gray-600">Inicia sesión</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100 backdrop-blur-sm">
                <LoginForm/>
            </div>
        </div>
    </div>
);

export default LoginPage;
