// src/pages/OAuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

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
            const checkuser = async (token) =>{
              try{

               const response =await axios.post('http://localhost:8000/auth/user/present', {} , {headers: {
                       Authorization: `Bearer ${token}` // send token in header
                   }});
                  if (response.status === 200) {
                      console.log("✅ User exists:", response.data);
                  }
              }
              catch (error) {
                  if(error.response && error.response.status === 404){
                      navigate('/login');
                  }
                  else{
                      console.log(error.response);
                  }
              }

            }
            // navigate('/dashboard'); // or your protected route
        }
    }, [location, navigate]);

    return <div>Logging you in...</div>;
};

export default OAuthSuccess;
