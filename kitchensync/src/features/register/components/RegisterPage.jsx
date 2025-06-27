import { IconChefHatFilled, IconUsers } from "@tabler/icons-react";
import RegisterForm from "./RegisterFom.jsx";
import Layout from "../../../shared/ui/Layout.jsx";

const RegisterPage = () => (
    <Layout>
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                                <IconUsers className="w-6 h-6 text-white" stroke={2} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Registro de Empleados</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full mb-4 shadow-lg">
                                <IconChefHatFilled size={45} color="white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Kitchen Sync</h2>
                            <p className="text-gray-600">Crear usuario</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100 backdrop-blur-sm">
                            <RegisterForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
)

export default RegisterPage;