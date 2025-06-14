import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import {PlatformData} from "../hooks/PlatformData.jsx";
import Dashboard from "../Pages/DashBoard.jsx";
import Sidebar from "./Sidebar.jsx";

const dashBoardLayout = () =>{
    const [platform , setPlatform] = useState("Overall");
    const navigate = useNavigate();

    const handlelogoout = () =>{
        // localStorage.clear();
        // navigate("/");
    }
    return  (
        <div className="flex h-screen">
            <Sidebar selected={platform} onSelect={setPlatform}/>
            <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow">
                    <div className="text-xl font-semibold">
                        Coding Analytics Dashboard
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <ThemeToggle />
                        <PlatformData />
                        <button
                            onClick={handlelogoout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mx-2"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto flex" >
                    <Dashboard platform = {platform}/>
                   
                </main>
            </div>
        </div>
    )
}
export default dashBoardLayout;