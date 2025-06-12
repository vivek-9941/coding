import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext.jsx";
import { useFetchUser } from "../hooks/useFetchUser.js";
import { toast } from "react-toastify";

export const LeetcodeContext = createContext(null);

const LeetcodeProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Fix typo
    const [error, setError] = useState(false);

    let { user } = useUser();
    const fetchUser = useFetchUser();

    const fetchLeetcode = async () => {
        try {
            if (!user) {
                user = await fetchUser();
                if (!user) throw new Error("User fetch failed");
            }

            const token = localStorage.getItem("token");
            setLoading(true);

            const response = await axios.post(
                `http://localhost:8080/api/leetcode/get?handle=${user.lchandle}`,
                { user },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
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
        fetchLeetcode();
    }, []);

    return (
        <LeetcodeContext.Provider
            value={{ data, loading, error, refresh: fetchLeetcode }}
        >
            {children}
        </LeetcodeContext.Provider>
    );
};

export default LeetcodeProvider;
