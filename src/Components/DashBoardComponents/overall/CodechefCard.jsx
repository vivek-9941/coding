import {useEffect, useState} from "react";


const CodechefCard = ({onratingfetch}) =>{
    const [data , setData] = useState({});
    useEffect(() => {
        const codechefdata = localStorage.getItem("codechef");
        const parsed = JSON.parse(codechefdata)
        setData(parsed)
        if (onratingfetch && parsed.codechefRatings)onratingfetch(parsed.codechefRatings?.length)
    },[])

    return (
        <div className="flex flex-col">
            <div>CodeChef</div>
            <div>
                <ul>
                    <li>Handle: {data.handle}</li>
                    <li>RealName: {data.realName}</li>
                    <li>Country: {data.country}</li>
                    <li>Current Rating: {data.currentrating}</li>
                    <li>Global Ranking: {data.globalRanking}</li>

                </ul>
            </div>
        </div>
    )
}
export default CodechefCard;