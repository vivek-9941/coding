import {Routes, Route} from 'react-router-dom';

import DashBoard from "../Pages/DashBoard.jsx";
import LandingPage from "../Components/LandingPage.jsx";
import OAuthSuccess from "../Components/OAuthSuccess.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Register from "../Components/Register.jsx";
import NotFound from "../Pages/NotFound.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/oauth-success" element={<OAuthSuccess/>}/>
            <Route path="*" element={<NotFound />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Register/>}/>
                <Route path="/dashboard" element={<DashBoard/>}/>
            </Route>
        </Routes>
    );
};
export default AppRoutes;