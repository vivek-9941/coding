import { useEffect, useState } from "react";
import TagStatsChart from "./TagStatsChart.jsx";
import LeetcodeSubmissionStats from "./LeetcodeSubmissionStats.jsx";
import LeetcodeRanking from "./LeetcodeRanking.jsx";

const Leetcode = () => {
    const [leetdata, setLeetdata] = useState({});
    const [tagStats, setTagStats] = useState([]);
    const [stats , setStats] = useState({});

    useEffect(() => {
        const rawStats = localStorage.getItem("leetcode");
        const parsedLeet = JSON.parse(rawStats);
        setLeetdata(parsedLeet);
         const submissionStats = parsedLeet.submissionStats?.[0] || {};
        console.log(submissionStats);
         setStats(submissionStats);
        const parsedRawTagStats = parsedLeet.tagStats?.[0] || {};

        const formattedStats = Object.entries(parsedRawTagStats)
            .filter(([key, value]) => key !== "id" && value !== null && value > 0)
            .map(([key, value]) => ({
                name: key,
                count: value,
            }));

        setTagStats(formattedStats);
        // console.log(leetdata);
    }, []);

    return (
        <div className="p-4 w-full">
            {leetdata.handle && <LeetcodeRanking handle={leetdata.handle} />}
            <TagStatsChart data={tagStats} />
            <LeetcodeSubmissionStats data={stats}/>
        </div>
    );
};

export default Leetcode;
