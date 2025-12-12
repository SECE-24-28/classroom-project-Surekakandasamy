import { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from API on mount
  useEffect(() => {
    loadTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    console.log('TransactionContext: Adding transaction:', transaction);
    
    try {
      // Save to API first
      const savedTransaction = await ApiService.createTransaction(transaction);
      console.log('TransactionContext: Successfully saved to API:', savedTransaction);
      
      // Update local state with API response
      setTransactions(prev => [savedTransaction, ...prev]);
      
      // Notify admin dashboard
      window.dispatchEvent(new CustomEvent('transactionAdded', { detail: savedTransaction }));
      
      return savedTransaction;
    } catch (error) {
      console.error('TransactionContext: Failed to save transaction:', error);
      
      // Fallback: add to local state only
      setTransactions(prev => [transaction, ...prev]);
      window.dispatchEvent(new CustomEvent('transactionAdded', { detail: transaction }));
      
      return transaction;
    }
  };

  const loadTransactions = async () => {
    try {
      const apiTransactions = await ApiService.fetchTransactions();
      console.log('TransactionContext: Loaded transactions from API:', apiTransactions);
      setTransactions(apiTransactions || []);
    } catch (error) {
      console.error('TransactionContext: Failed to load transactions:', error);
      setTransactions([]);
    }
  };

  const getUserTransactions = (userEmail) => {
    if (!userEmail) return [];
    return transactions.filter(t => 
      t.userEmail === userEmail || 
      t.user === userEmail ||
      t.email === userEmail
    );
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      addTransaction, 
      loadTransactions, 
      getUserTransactions,
      setTransactions 
    }}>
      {children}
    </TransactionContext.Provider>
  );
};