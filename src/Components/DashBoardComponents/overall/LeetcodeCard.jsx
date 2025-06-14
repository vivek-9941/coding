
import {useEffect, useState} from "react";


const LeetcodeCard = () =>{
    const [data , setData] = useState({});
    useEffect(() => {
        const codeforcesdata = localStorage.getItem("leetcode");
        const parsed = JSON.parse(codeforcesdata)
        setData(parsed)
        // if (onratingfetch && parsed.codeforcesRatings)onratingfetch(parsed.codeforcesRatings?.length)

    },[])
    return (
        <div className="flex flex-col">
            <div>Leetcode</div>
            <div>
                <ul>
                    <li>Handle: {data.handle}</li>
                    <li>RealName: {data.realName}</li>
                    <li>TotalSolved Questions: {data.totalSolved}</li>
                    <li>Global Rank: {data.globalranking}</li>
                    <li>Country: {data.country}</li>

                </ul>
            </div>
        </div>
    )
}
export default LeetcodeCard;