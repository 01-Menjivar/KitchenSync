import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const role = user.decodedToken?.role;

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RoleProtectedRoute;
