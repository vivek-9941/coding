import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import LeetcodeAnalytics from "./LeetcodeAnalytics.jsx";

const LeetcodeRanking = ({handle}) => {
    console.log('Component rendered with handle:', handle, 'Type:', typeof handle);
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('useEffect triggered with handle:', handle);

        // Don't make API call if handle is not provided or is empty
        if (!handle || handle.trim() === '') {
            console.log('Handle is empty or undefined, skipping API call');
            return;
        }

        const fetchData = async () => {
            console.log('Starting API call for handle:', handle);
            setLoading(true);

            const token = localStorage.getItem("token");
            console.log('Token:', token ? 'Present' : 'Missing');

            try {
                const url = `http://localhost:8080/api/leetcode/ranking?username=${handle}`;
                console.log('Making request to:', url);

                const response = await axios.post(url, {}, {
                    headers: {Authorization: `Bearer ${token}`}
                });

                console.log('Response status:', response.status);
                console.log('Response data:', response.data);

                if (response.status === 200) {
                    setRankings(response.data);
                    console.log('Rankings set successfully');
                }
            } catch (error) {
                console.error('API Error:', error);
                console.error('Error response:', error.response?.data);
                console.error('Error status:', error.response?.status);
                toast.error("Error fetching leetcode ranking");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [handle]); // This will trigger whenever handle changes

    // Add some debug rendering
    if (loading) {
        return <div>Loading LeetCode data for {handle}...</div>;
    }

    if (!handle) {
        return <div>No handle provided</div>;
    }

    if (rankings && Object.keys(rankings).length === 0) {
        return <div>No data available for {handle}</div>;
    }

    return <LeetcodeAnalytics data={rankings}/>;
}

export default LeetcodeRanking;