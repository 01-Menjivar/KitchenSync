import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconChefHatFilled, IconUsers, IconLogout, IconSettings, IconUser, IconShield } from '@tabler/icons-react';
import { useAuthStore } from '../../features/auth/store.js';
import {roles} from "../constants/roles.js";

const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsDropdownOpen(false);
        logout();
        navigate('/login');
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getRoleIcon = (role) => {
        switch(role) {
            case roles.admin:
                return <IconShield size={16} className="text-purple-500" />;
            case roles.waiter:
                return <IconUser size={16} className="text-blue-500" />;
            case roles.cook:
                return <IconChefHatFilled size={16} className="text-orange-500" />;
            default:
                return <IconUser size={16} className="text-gray-500" />;
        }
    };

    const getRoleLabel = (role) => {
        switch(role) {
            case roles.admin:
                return 'Administrador';
            case roles.waiter:
                return 'Mesero';
            case roles.cook:
                return 'Cocinero';
            default:
                return 'Usuario';
        }
    };

    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-amber-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/admin/tables" className="flex items-center space-x-3 group">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg group-hover:shadow-xl group-hover:shadow-amber-500/30 transition-all duration-300">
                                <IconChefHatFilled size={24} color="white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                                Kitchen Sync
                            </h1>
                        </Link>
                    </div>

                    {user?.decodedToken.role === roles.admin && (
                        <div className="hidden md:block">
                            <nav className="ml-10 flex items-center space-x-2">
                                <Link
                                    to="/admin/tables"
                                    className="group relative flex items-center space-x-2 text-amber-700 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                                    <IconChefHatFilled size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="relative z-10">Gestión de Mesas</span>
                                </Link>
                                <Link
                                    to="/admin/dishes"
                                    className="group relative flex items-center space-x-2 text-amber-700 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                                    <IconSettings size={18} className="relative z-10 group-hover:rotate-180 transition-transform duration-500" />
                                    <span className="relative z-10">Gestionar Platillos</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="group relative flex items-center space-x-2 text-amber-700 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                                    <IconUsers size={18} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="relative z-10">Registrar Empleados</span>
                                </Link>
                            </nav>
                        </div>
                    )}

                      {user?.decodedToken.role === roles.waiter && (
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/waiter/dashboard"
                                    className="text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md"
                                >
                                    
                                </Link>
                            </div>
                        </div>
                    )}

                        {user?.decodedToken.role === roles.cook && (
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/cook/dashboard"
                                    className="text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md"
                                >
                                    
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block text-right">
                                <div className="text-sm font-medium text-amber-900">
                                    {user?.decodedToken.sub || 'Usuario'}
                                </div>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:from-amber-600 hover:to-orange-600 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 focus:outline-none focus:ring-4 focus:ring-amber-200">
                                    {getInitials(user?.decodedToken.sub || 'Usuario')}
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden backdrop-blur-sm">
                                        <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 px-6 py-5">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold text-lg border-2 border-white/30">
                                                    {getInitials(user?.decodedToken.sub || 'Usuario')}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-white font-semibold text-base">
                                                        {user?.decodedToken.sub || 'Usuario'}
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        {getRoleIcon(user?.decodedToken.role)}
                                                        <span className="text-white/90 text-sm font-medium">
                                                            {getRoleLabel(user?.decodedToken.role)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                                        </div>

                                        {user?.decodedToken.role === roles.admin && (
                                            <div className="md:hidden border-b border-gray-100">
                                                <div className="px-2 py-2">
                                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
                                                        Navegación
                                                    </div>
                                                    <Link
                                                        to="/admin/tables"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all duration-200 rounded-xl mx-2 group"
                                                    >
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 text-amber-600 mr-3 group-hover:bg-amber-200 transition-colors">
                                                            <IconChefHatFilled size={16} />
                                                        </div>
                                                        <span className="font-medium">Gestión de Mesas</span>
                                                    </Link>
                                                    <Link
                                                        to="/admin/dishes"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all duration-200 rounded-xl mx-2 group"
                                                    >
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 mr-3 group-hover:bg-blue-200 transition-colors">
                                                            <IconChefHatFilled size={16} />
                                                        </div>
                                                        <span className="font-medium">Gestionar Platillos</span>
                                                    </Link>
                                                    <Link
                                                        to="/register"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all duration-200 rounded-xl mx-2 group"
                                                    >
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-600 mr-3 group-hover:bg-purple-200 transition-colors">
                                                            <IconUsers size={16} />
                                                        </div>
                                                        <span className="font-medium">Registrar Empleados</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        <div className="border-t border-gray-100 px-2 py-3">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:text-red-700 transition-all duration-200 rounded-xl mx-2 group"
                                            >
                                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600 mr-3 group-hover:bg-red-200 transition-colors">
                                                    <IconLogout size={16} />
                                                </div>
                                                <span className="font-medium">Cerrar Sesión</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </div>
    );
};

export default Topbar;