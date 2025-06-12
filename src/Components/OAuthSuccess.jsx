import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
const OAuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        console.log(token);
        localStorage.setItem('token', token); // Store only after successful check
        const checkUser = async (token) => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/auth/user/present',
                    {},
                    { headers: { Authorization: `Bearer ${token}` }
                    });

                if (response.status === 200) {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("User check failed:", error);
                if (error.response?.status === 404) {
                    console.log("user not found "+ error.response.data)
                    const email = error.response.data;
                    navigate('/login', { state: { email } });
                } else {
                    localStorage.removeItem('token'); // Clear invalid token
                    navigate('/login');
                }
            }
        };

        if (token) {
            checkUser(token);
        } else {
            navigate('/login');
        }
    }, [location, navigate]);

    return <div>Logging you in...</div>;
};

export default OAuthSuccess;