
import {useEffect, useState} from "react";


const CodeforcesCard = ({onratingfetch}) =>{
    const [data , setData] = useState({});
    useEffect(() => {
        const codeforcesdata = localStorage.getItem("codeforces");
        const parsed = JSON.parse(codeforcesdata)
        setData(parsed)
        if (onratingfetch && parsed.codeforcesRatings)onratingfetch(parsed.codeforcesRatings?.length)

    },[])
    return (
        <div className="flex flex-col">
            <div>Codeforces</div>
            <div>
                <ul>
                    <li>Handle: {data.handle}</li>
                    <li>RealName: {data.realName}</li>
                    <li>Global Rank: {data.globalrank}</li>
                    <li>Max Rating: {data.maxRating}</li>
                    <li>Current Rating: {data.rating}</li>

                </ul>
            </div>
        </div>
    )
}
export default CodeforcesCard;