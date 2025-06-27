import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from '../features/auth/components/LoginPage';
import RegisterPage from "../features/register/components/RegisterPage.jsx";
import RoleProtectedRoute from "./RoleProtectedRoute.jsx";
import {roles} from "../shared/constants/roles.js";
import TableManagement from "../features/tables/components/TableManagement.jsx";
import DishManagement from "../features/dishes/components/DishManagement.jsx";
import WaiterDashboard from "../features/waiter/components/WaiterDashboard.jsx";
import CookDashboard from '../features/cook/components/CookDashboard.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/register"
                element={
                    <RoleProtectedRoute allowedRoles={[roles.admin]}>
                        <RegisterPage />
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/admin/tables"
                element={
                    <RoleProtectedRoute allowedRoles={[roles.admin]}>
                        <TableManagement/>
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/admin/dishes"
                element={
                    <RoleProtectedRoute allowedRoles={[roles.admin]}>
                        <DishManagement/>
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/waiter/dashboard"
                element={
                    <RoleProtectedRoute allowedRoles={[roles.waiter]}>
                        <WaiterDashboard/>
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/cook/dashboard"
                element={
                    <RoleProtectedRoute allowedRoles={[roles.cook]}>
                        <CookDashboard/>
                    </RoleProtectedRoute>
                }
            />



            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
