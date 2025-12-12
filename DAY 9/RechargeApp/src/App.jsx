import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RechargePlans from "./pages/RechargePlans";
import Recharge from "./pages/Recharge";
import About from "./pages/About";
import Help from "./pages/Help";
import History from "./pages/History";
import './App.css';

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TransactionProvider>
          <Router>
          <div className="min-h-screen w-full">
            <NavBar />
            <main className="w-full">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/plans" element={<ProtectedRoute><RechargePlans /></ProtectedRoute>} />
                <Route path="/recharge" element={<ProtectedRoute><Recharge /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </Router>
        </TransactionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
