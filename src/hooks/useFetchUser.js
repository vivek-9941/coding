import { useUser } from "../Context/UserContext.jsx";
import axios from "axios";

export const useFetchUser = () => {
    const { saveUser } = useUser();

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/auth/user/fetchuser", {
                headers: { Authorization: `Bearer ${token}` ,
                        "Content-Type": "application/json"
                },
            });
            const userData = response.data;
            saveUser(userData);
            return userData;
        } catch (error) {
            console.error("Fetch user failed:", error);
            return null;
        }
    };

    return fetchUser;
};
