import { Routes, Route } from 'react-router-dom';

import DashBoard from "../Pages/DashBoard.jsx";
import LandingPage from "../Components/LandingPage.jsx";
import OAuthSuccess from "../Components/OAuthSuccess.jsx";
const AppRoutes = ()=> {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
    );
};
export default AppRoutes;