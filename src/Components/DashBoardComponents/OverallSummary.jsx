import CodechefCard from "./CodechefCard.jsx";
import {useState} from "react";
import CodeforcesCard from "./CodeforcesCard.jsx";
import LeetcodeCard from "./LeetcodeCard.jsx";

const overallSummary = () =>{
    // const [leetcont ,setLeetcont] = useState(null);
    const [chefcont , setChefcont] = useState(null);
    const [forcecont ,setForcecont] = useState(null);
    return(
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 ">Overall Summary</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

               <div className="bg-white dark:bg-gray-800 dark:shadow-gray-700 p-4 rounded-xl shadow hover:shadow-md transition"><CodechefCard onratingfetch = {setChefcont}/></div>
               <div className="bg-white dark:bg-gray-800 dark:shadow-gray-700 p-4 rounded-xl shadow hover:shadow-md transition"><CodeforcesCard onratingfetch = {setForcecont}/></div>
               <div className="bg-white dark:bg-gray-800 dark:shadow-gray-700 p-4 rounded-xl shadow hover:shadow-md transition"><LeetcodeCard /></div>
           </div>
            <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-sm dark:shadow-gray-700 sm:text-base">
                <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">CP Contests</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                 <li>Codechef : {chefcont}</li>
                 <li>Codeforces: {forcecont}</li>
             </ul>
         </div>
        </div>
    )
}
export default overallSummary;