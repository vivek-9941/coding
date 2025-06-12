import {createContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useUser} from "./UserContext.jsx";
import {useFetchUser} from "../hooks/useFetchUser.js";
import {toast} from "react-toastify";
import {checkAuthSync} from "../Utility/TokenValidation.js";

export const LeetcodeContext = createContext(null);

const LeetcodeProvider = ({children}) => {
    const [data, setData] = useState(null);
    const isAuth = checkAuthSync();
    const [loading, setLoading] = useState(true); // ✅ Fix typo
    const [error, setError] = useState(false);
    let {user} = useUser();
    const fetchUser = useFetchUser();
    const hasFetched = useRef(false); // Track if we've fetched already


    const fetchLeetcode = async () => {
        try {
            if (!user) {
                user = await fetchUser();
                if (!user) {
                    // navigate("/login");
                    return;
                }
            }
            const token = localStorage.getItem("token");
            setLoading(true);
            console.log(token);
            console.log(user);
            const response = await axios.post(
                `http://localhost:8080/api/leetcode/get?handle=${user.lchandle}`,
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 401) {
                if (!isAuth) {
                    window.location.href = "http://localhost:8080/oauth2/authorization/google";
                }
            }
            if (response.status === 200) {
                console.log(response.data);
                setData(response.data);
                toast.success("Successfully fetched LeetCode data.");
            }
        } catch (error) {
            setError(error);
            toast.error(error.message || "Failed to fetch LeetCode data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && !data && !hasFetched.current) {
            hasFetched.current = true;
            fetchLeetcode();
        }
    }, []);

    return (
        <LeetcodeContext.Provider
            value={{data, loading, error, refresh: fetchLeetcode}}
        >
            {children}
        </LeetcodeContext.Provider>
    );
};

export default LeetcodeProvider;
