import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Plans from "./pages/Plans";
import Recharge from "./pages/Recharge";
import About from "./pages/About";
import Help from "./pages/Help";
import History from "./pages/History";
import './App.css';

import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { TransactionProvider } from "./context/TransactionContext";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <TransactionProvider>
          <Router>
          <div className="min-h-screen w-full">
            <NavBar />
            <main className="w-full">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/recharge" element={<Recharge />} />
                <Route path="/history" element={<History />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </main>
          </div>
        </Router>
        </TransactionProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
