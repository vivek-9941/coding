// src/hooks/useFetchUser.js
import { useUser } from "../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useFetchUser = () => {
    const { saveUser } = useUser();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const response = await axios.get("https://localhost:8080/auth/user/fetchuser", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userData = response.data;
            saveUser(userData); // update context
            return userData;
        } catch (error) {
            console.error("Failed to fetch user:", error);
            navigate("/login");
            return null;
        }
    };

    return fetchUser;
};
