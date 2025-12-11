import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';

export default function History() {
  const { themeConfig } = useTheme();
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState('all');

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status.toLowerCase() === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Success': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'Failed': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  return (
    <div className={`w-full min-h-[calc(100vh-80px)] ${themeConfig.bg} p-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${themeConfig.text}`}>Transaction History</h1>
            <p className={`text-lg ${themeConfig.textSecondary}`}>View all your recharge transactions</p>
          </div>
          
          <div className={`${themeConfig.cardBg} ${themeConfig.border} border rounded-lg p-1 flex space-x-1`}>
            {['all', 'success', 'failed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 capitalize ${
                  filter === filterType 
                    ? 'bg-red-600 text-white' 
                    : `${themeConfig.text} hover:${themeConfig.secondary.split(' ')[0]}`
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredTransactions.map(transaction => (
            <div key={transaction.id} className={`${themeConfig.cardBg} ${themeConfig.border} border p-6 rounded-xl shadow-lg`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className={`text-lg font-semibold ${themeConfig.text}`}>{transaction.operator}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className={`${themeConfig.textSecondary}`}>Mobile Number</p>
                      <p className={`font-medium ${themeConfig.text}`}>{transaction.mobile}</p>
                    </div>
                    <div>
                      <p className={`${themeConfig.textSecondary}`}>Plan</p>
                      <p className={`font-medium ${themeConfig.text}`}>{transaction.plan}</p>
                    </div>
                    <div>
                      <p className={`${themeConfig.textSecondary}`}>Transaction ID</p>
                      <p className={`font-medium ${themeConfig.text}`}>{transaction.id}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:text-right">
                  <p className={`text-2xl font-bold ${themeConfig.text}`}>₹{transaction.amount}</p>
                  <p className={`text-sm ${themeConfig.textSecondary}`}>
                    {transaction.date} at {transaction.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className={`${themeConfig.cardBg} ${themeConfig.border} border p-12 rounded-xl shadow-lg text-center`}>
            <div className="text-6xl mb-4">📱</div>
            <h3 className={`text-xl font-semibold mb-2 ${themeConfig.text}`}>No Transactions Found</h3>
            <p className={`${themeConfig.textSecondary}`}>
              {filter === 'all' 
                ? 'You haven\'t made any transactions yet.' 
                : `No ${filter} transactions found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}