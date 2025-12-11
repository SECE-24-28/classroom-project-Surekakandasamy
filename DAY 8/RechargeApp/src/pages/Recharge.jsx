import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import RechargeForm from '../components/RechargeForm';

export default function Recharge() {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeConfig } = useTheme();
  const { addTransaction } = useTransactions();
  const { deductBalance } = useAuth();
  const selectedPlan = location.state?.selectedPlan;

  const handleRecharge = (data) => {
    deductBalance(data.amount);
    addTransaction({
      mobile: data.mobile,
      amount: data.amount,
      plan: data.plan.name,
      operator: data.operator
    });
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
