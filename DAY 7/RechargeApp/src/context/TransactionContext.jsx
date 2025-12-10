import { createContext, useContext, useState } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      type: 'Recharge',
      operator: 'Airtel',
      mobile: '9876543210',
      amount: 299,
      plan: 'Unlimited 28 Days',
      date: '2024-01-15',
      time: '14:30',
      status: 'Success'
    },
    {
      id: 'TXN002',
      type: 'Recharge',
      operator: 'Jio',
      mobile: '9876543210',
      amount: 199,
      plan: '1.5GB/Day 28 Days',
      date: '2024-01-10',
      time: '10:15',
      status: 'Success'
    }
  ]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      status: 'Success',
      type: 'Recharge',
      operator: 'Airtel'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};