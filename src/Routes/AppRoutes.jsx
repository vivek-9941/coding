import {Routes, Route, Router} from 'react-router-dom';

import DashBoard from "../Pages/DashBoard.jsx";
import LandingPage from "../Components/LandingPage.jsx";
import OAuthSuccess from "../Components/OAuthSuccess.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
const AppRoutes = ()=> {
    return (

        <Routes>

            <Route path="/" element={<LandingPage/>} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                <DashBoard/>
                </ProtectedRoute>
            } />
        </Routes>

    );
};
export default AppRoutes;