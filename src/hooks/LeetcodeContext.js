import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useUser} from "../Context/UserContext.jsx";
import {useFetchUser} from "./useFetchUser.js";
import {toast} from "react-toastify";
import {checkAuthSync} from "../Utility/TokenValidation.js";

export const useLeetcode = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isAuth = checkAuthSync();
    let {user} = useUser();
    const fetchUser = useFetchUser();


    const fetchLeetcode = async () => {
        try {
            if (!user) {
                user = await fetchUser();
                if (!user) return;
            }

            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await axios.post(
                `http://localhost:8080/api/leetcode/get?handle=${user.lchandle}`,
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setData(response.data);
                toast.success("leetcode fetched");
                return response.data;

            } else if (response.status === 401 && !isAuth) {
                window.location.href = "http://localhost:8080/oauth2/authorization/google";
            }
        } catch (err) {
            setError(err.message || "Failed to fetch LeetCode data");
            toast.error(err.message || "Fetch failed");
        } finally {
            setLoading(false);
            console.log(data);

        }
    };


    return {data, loading, fetchLeetcode};
};
