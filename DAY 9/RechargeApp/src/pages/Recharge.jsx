import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import RechargeForm from '../components/RechargeForm';
import ApiService from '../services/api';

export default function Recharge() {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeConfig } = useTheme();
  const { addTransaction } = useTransactions();
  const { deductBalance, user } = useAuth();
  const selectedPlan = location.state?.selectedPlan;

  const handleRecharge = async (data) => {
    const now = new Date();
    const transactionData = {
      id: `TXN${Date.now()}`,
      mobile: data.mobile,
      phoneNumber: data.mobile,
      amount: data.amount,
      plan: data.plan.name,
      operator: data.operator,
      user: user?.email,
      userName: user?.name || user?.email?.split('@')[0] || 'Unknown',
      userEmail: user?.email,
      email: user?.email,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour12: true }),
      status: 'completed',
      type: 'Recharge',
      createdAt: now.toISOString()
    };
    
    console.log('Recharge: Creating transaction with data:', transactionData);
    
    deductBalance(data.amount);
    await addTransaction(transactionData);
    
    navigate('/dashboard');
  };

  if (!selectedPlan) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-6 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl text-center border border-white/20">
          <p className="mb-4 text-lg">No plan selected.</p>
          <button onClick={() => navigate('/plans')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">Go back to plans</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Recharge</h1>
        <RechargeForm selectedPlan={selectedPlan} onClose={() => navigate('/plans')} onRecharge={handleRecharge} />
      </div>
    </div>
  );
}
