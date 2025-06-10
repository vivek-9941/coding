import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./Routes/AppRoutes.jsx";

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <AppRoutes />
            </div>
        </Router>
    );
}

export default App;
