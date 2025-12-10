import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const themeConfig = {
    light: {
      bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      cardBg: 'bg-white/90 backdrop-blur-sm',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-white/20'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
      cardBg: 'bg-gray-800/90 backdrop-blur-sm',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700/50'
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeConfig: themeConfig[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
