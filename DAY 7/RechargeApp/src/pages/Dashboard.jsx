import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { user, logout } = useUser();
  const { themeConfig } = useTheme();
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  const [balance] = useState(1000);
  const recentTransactions = transactions.slice(0, 3);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className={`w-full min-h-[calc(100vh-80px)] ${themeConfig.bg} p-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${themeConfig.text}`}>Dashboard</h1>
          <p className={`text-lg ${themeConfig.textSecondary}`}>Welcome back, {user.name}!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className={`${themeConfig.cardBg} ${themeConfig.border} p-6 rounded-xl shadow-lg border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeConfig.textSecondary}`}>Account Balance</p>
                <p className={`text-3xl font-bold ${themeConfig.text}`}>₹{balance}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
          </div>
          
          <div className={`${themeConfig.cardBg} ${themeConfig.border} p-6 rounded-xl shadow-lg border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeConfig.textSecondary}`}>Active Plans</p>
                <p className={`text-3xl font-bold ${themeConfig.text}`}>2</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📱</span>
              </div>
            </div>
          </div>
          
          <div className={`${themeConfig.cardBg} ${themeConfig.border} p-6 rounded-xl shadow-lg border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeConfig.textSecondary}`}>This Month</p>
                <p className={`text-3xl font-bold ${themeConfig.text}`}>₹997</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">📈</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${themeConfig.cardBg} ${themeConfig.border} p-6 rounded-xl shadow-lg border`}>
            <h3 className={`text-xl font-semibold mb-4 ${themeConfig.text}`}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/plans')} 
                className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">📱</div>
                <div className="font-medium">View Plans</div>
              </button>
              <button 
                onClick={() => navigate('/recharge')} 
                className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-medium">Recharge</div>
              </button>
              <button 
                onClick={() => navigate('/history')} 
                className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">📈</div>
                <div className="font-medium">History</div>
              </button>
              <button 
                onClick={() => navigate('/help')} 
                className="p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">🆘</div>
                <div className="font-medium">Help</div>
              </button>
            </div>
          </div>
          
          <div className={`${themeConfig.cardBg} ${themeConfig.border} p-6 rounded-xl shadow-lg border`}>
            <h3 className={`text-xl font-semibold mb-4 ${themeConfig.text}`}>Recent Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.length > 0 ? recentTransactions.map(transaction => (
                <div key={transaction.id} className={`flex justify-between items-center p-3 ${themeConfig.bg} rounded-lg`}>
                  <div>
                    <p className={`font-medium ${themeConfig.text}`}>{transaction.plan}</p>
                    <p className={`text-sm ${themeConfig.textSecondary}`}>{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${themeConfig.text}`}>₹{transaction.amount}</p>
                    <p className="text-sm text-green-600">{transaction.status}</p>
                  </div>
                </div>
              )) : (
                <p className={`text-center ${themeConfig.textSecondary} py-4`}>No transactions yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
