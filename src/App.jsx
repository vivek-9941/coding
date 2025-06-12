import './App.css'
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from "./Routes/AppRoutes.jsx";
import {Toaster} from "react-hot-toast";
import {ToastContainer} from "react-toastify";

function App() {
    return (

        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <ToastContainer/>
            <AppRoutes/>
        </div>
    );
}

export default App;
