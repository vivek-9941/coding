import { useTheme } from '../context/ThemeContext';
import "@fontsource-variable/inter";
import ThemeToggle from "./ThemeToggle.jsx";
import {checkAuthSync, isAuthenticated} from "../Utility/TokenValidation.js";

const LandingPage = () => {

    const { theme } = useTheme();
    const isAuth = checkAuthSync(); // Use synchronous check

    return (
        <div className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} transition-colors duration-300`} style={{ fontFamily: '"Inter Variable", sans-serif' }}>
            {/* Header */}
            <header className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="bg-green-600 text-white px-2 py-1 font-bold rounded">↗</div>
                    <span className="text-lg font-semibold">coder's playground</span>
                </div>

                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <button className="text-green-700 dark:text-green-400">Personal</button>
                    <button>Business</button>
                    <button>Features</button>
                    <button>Pricing</button>
                    <button>Help</button>
                    <button>EN</button>
                </nav>
                <div className="flex gap-4">
                    {!isAuth && (
                        <a href="http://localhost:8080/oauth2/authorization/google">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                                Continue with Google
                            </button>
                        </a>
                    )}
                    <ThemeToggle />
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-grow text-center py-24 px-6">
                <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                    MONEY FOR HERE,<br />THERE AND<br />EVERYWHERE
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    170 countries. 50 currencies. Get the account built to save you money round the world.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-600">
                        Open an account
                    </button>
                    <button className="border border-gray-700 dark:border-gray-300 px-6 py-2 rounded-full text-sm font-medium">
                        Send money now
                    </button>
                </div>
            </section>

            {/* Footer placeholder */}
            <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-400 ">
                © 2025 Wise. Curated by Mobbin
            </footer>
        </div>
    );
};

export default LandingPage;