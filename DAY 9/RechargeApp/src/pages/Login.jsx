import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ApiService from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('user');
  const { login } = useAuth();
  const { themeConfig } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = { 
        name: email.split('@')[0], 
        email, 
        role: userType 
      };
      
      // Save user to API if it's a regular user login
      if (userType === 'user') {
        try {
          await ApiService.createUser(userData);
        } catch (error) {
          // User might already exist, that's okay
          console.log('User might already exist:', error.message);
        }
      }
      
      login(userData);
      navigate(userType === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Still proceed with login even if API fails
      const userData = { 
        name: email.split('@')[0], 
        email, 
        role: userType 
      };
      login(userData);
      navigate(userType === 'admin' ? '/admin' : '/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className={`flex items-center justify-center min-h-[calc(100vh-80px)] ${themeConfig.bg} w-full p-4`}>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className={`${themeConfig.cardBg} ${themeConfig.border} p-8 rounded-lg shadow-lg border`}>
          <div className="text-center mb-8">
            <img src="/logo.png" alt="RechargeApp Logo" className="w-16 h-16 rounded-lg mx-auto mb-4" />
            <h2 className={`text-2xl font-bold ${themeConfig.text}`}>Welcome Back</h2>
            <p className={`${themeConfig.textSecondary} mt-2`}>Sign in to your account</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeConfig.text} mb-2`}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 ${themeConfig.border} border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${themeConfig.cardBg} ${themeConfig.text}`}
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeConfig.text} mb-2`}>Login as</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className={`w-full p-3 ${themeConfig.border} border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${themeConfig.cardBg} ${themeConfig.text}`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeConfig.text} mb-2`}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 ${themeConfig.border} border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${themeConfig.cardBg} ${themeConfig.text}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-3 ${themeConfig.textSecondary} hover:${themeConfig.text}`}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {loading ? <LoadingSpinner /> : 'Sign In'}
          </button>
          
          <p className={`mt-6 text-center ${themeConfig.textSecondary}`}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
