import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'react-feather'; // or use `react-icons`

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full border dark:border-gray-500 transition"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'dark' ? <Sun className="text-white" /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;
