import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeProvider} from "./Context/ThemeContext.jsx";
import {UserProvider} from "./Context/UserContext.jsx";
import {BrowserRouter} from "react-router-dom";


createRoot(document.getElementById('root')).render(
    <StrictMode>
    <ThemeProvider>
        <UserProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>

        </UserProvider>
    </ThemeProvider>
    </StrictMode>
)
