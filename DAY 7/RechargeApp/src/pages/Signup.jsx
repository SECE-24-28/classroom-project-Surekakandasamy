import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser();
  const { themeConfig } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login({ name, email });
    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className={`flex items-center justify-center min-h-[calc(100vh-80px)] ${themeConfig.bg} w-full p-4`}>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className={`${themeConfig.cardBg} ${themeConfig.border} p-8 rounded-2xl shadow-2xl border`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h2 className={`text-3xl font-bold ${themeConfig.text}`}>Create Account</h2>
            <p className={`${themeConfig.textSecondary} mt-2`}>Join us today</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeConfig.text} mb-2`}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${themeConfig.cardBg} ${themeConfig.text}`}
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeConfig.text} mb-2`}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${themeConfig.cardBg} ${themeConfig.text}`}
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeConfig.text} mb-2`}>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${themeConfig.cardBg} ${themeConfig.text}`}
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeConfig.text} mb-2`}>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${themeConfig.cardBg} ${themeConfig.text}`}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-3 rounded-lg font-semibold transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            {loading ? <LoadingSpinner /> : 'Create Account'}
          </button>
          
          <p className={`mt-6 text-center ${themeConfig.textSecondary}`}>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
