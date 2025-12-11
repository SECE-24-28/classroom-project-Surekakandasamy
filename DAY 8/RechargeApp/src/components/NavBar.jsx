import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme, themeConfig } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`w-full px-6 py-4 ${themeConfig.cardBg} border-b ${themeConfig.border} shadow-sm`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="RechargeApp Logo" className="w-10 h-10 rounded-lg" />
          <h1 className={`text-2xl font-bold ${themeConfig.text}`}>RechargeApp</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-md ${themeConfig.secondary} transition-colors`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                isActive('/') 
                  ? 'bg-red-600 text-white' 
                  : `${themeConfig.text} hover:${themeConfig.secondary.split(' ')[0]}`
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                isActive('/about') 
                  ? 'bg-red-600 text-white' 
                  : `${themeConfig.text} hover:${themeConfig.secondary.split(' ')[0]}`
              }`}
            >
              About
            </Link>
            {isLoggedIn && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                    isActive('/dashboard') 
                      ? 'bg-red-600 text-white' 
                      : `${themeConfig.text} hover:${themeConfig.secondary.split(' ')[0]}`
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/plans" 
                  className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                    isActive('/plans') 
                      ? 'bg-red-600 text-white' 
                      : `${themeConfig.text} hover:${themeConfig.secondary.split(' ')[0]}`
                  }`}
                >
                  Plans
                </Link>
              </>
            )}
          </div>
          
          {isLoggedIn ? (
            <>
              <span className={`font-medium ${themeConfig.textSecondary} hidden lg:block`}>Welcome, {user?.name}</span>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive('/login') 
                    ? 'bg-red-600 text-white' 
                    : `${themeConfig.text} hover:${themeConfig.secondary.split(' ')[0]}`
                }`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
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
