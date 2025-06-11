import {useUser} from "../Context/UserContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const FetchUser = () => {
    const {saveUser} = useUser();
    const navigate = useNavigate();
    const HandleFetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await axios.get("https://localhost:8080/auth/user/fetchuser", {headers: {Authorization: `Bearer ${token}`}});
            const userData = response.data;
            saveUser(userData);
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    }
}
