import { Navigate } from "react-router-dom";
import {isAuthenticated} from "../Utility/TokenValidation.js";
 // your utility

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default ProtectedRoute;
