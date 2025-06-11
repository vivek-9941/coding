import { Navigate, Outlet } from "react-router-dom";
import {isAuthenticated} from "../Utility/TokenValidation.js";
 // your utility

const ProtectedRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
