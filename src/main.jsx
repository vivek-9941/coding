import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeProvider} from "./Context/ThemeContext.jsx";
import {UserProvider} from "./Context/UserContext.jsx";
import LeetcodeProvider from "./Context/LeetcodeContext.jsx";
import {BrowserRouter} from "react-router-dom";
import CodeforcesProvider from "./Context/CodeforcesContext.jsx";
import CodechefProvider from "./Context/CodechefContext.jsx";

createRoot(document.getElementById('root')).render(

        <ThemeProvider>
            <UserProvider>
                <LeetcodeProvider>
                    <CodeforcesProvider>
                        <CodechefProvider>
                            <BrowserRouter>
                                <App/>
                            </BrowserRouter>
                        </CodechefProvider>
                    </CodeforcesProvider>
                </LeetcodeProvider>
            </UserProvider>
        </ThemeProvider>

)
