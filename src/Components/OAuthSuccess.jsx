// src/pages/OAuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            // Optionally decode it and set user in context
            // Redirect to dashboard or homepage
            navigate('/dashboard'); // or your protected route
        }
    }, [location, navigate]);

    return <div>Logging you in...</div>;
};

export default OAuthSuccess;
