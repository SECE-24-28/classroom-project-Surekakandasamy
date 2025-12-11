import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(1000);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setBalance(1000); // Reset balance on login
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setBalance(0);
  };

  const deductBalance = (amount) => {
    setBalance(prev => prev - amount);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, balance, login, logout, deductBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;