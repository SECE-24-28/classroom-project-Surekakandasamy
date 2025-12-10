import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme, themeConfig } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`w-full p-4 backdrop-blur-md border-b ${theme === "light" ? "bg-white/90 border-gray-200" : "bg-gray-900/90 border-gray-700"} shadow-lg`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <h2 className={`text-2xl font-bold ${themeConfig.text}`}>RechargeApp</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-lg transition-all duration-200 ${theme === "light" ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-800 hover:bg-gray-700"}`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          {user ? (
            <>
              <span className={`font-medium ${themeConfig.textSecondary} hidden lg:block`}>Welcome, {user.name}</span>
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                  isActive('/dashboard') 
                    ? 'bg-blue-600 text-white' 
                    : `${themeConfig.text} hover:bg-blue-100 dark:hover:bg-blue-900`
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/plans" 
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                  isActive('/plans') 
                    ? 'bg-green-600 text-white' 
                    : `${themeConfig.text} hover:bg-green-100 dark:hover:bg-green-900`
                }`}
              >
                Plans
              </Link>
              <Link 
                to="/history" 
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                  isActive('/history') 
                    ? 'bg-purple-600 text-white' 
                    : `${themeConfig.text} hover:bg-purple-100 dark:hover:bg-purple-900`
                }`}
              >
                History
              </Link>
              <Link 
                to="/help" 
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                  isActive('/help') 
                    ? 'bg-orange-600 text-white' 
                    : `${themeConfig.text} hover:bg-orange-100 dark:hover:bg-orange-900`
                }`}
              >
                Help
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                  isActive('/about') 
                    ? 'bg-teal-600 text-white' 
                    : `${themeConfig.text} hover:bg-teal-100 dark:hover:bg-teal-900`
                }`}
              >
                About
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive('/login') 
                    ? 'bg-blue-600 text-white' 
                    : `${themeConfig.text} hover:bg-blue-100 dark:hover:bg-blue-900`
                }`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
