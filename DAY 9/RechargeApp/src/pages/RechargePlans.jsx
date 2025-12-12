import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import PlansGrid from '../components/PlansGrid';
import ApiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import SAMPLE_PLANS from '../data/plans';

export default function RechargePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { themeConfig } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    setLoading(true);
    const apiPlans = await ApiService.fetchPlans();
    // Fallback to sample plans if API fails
    setPlans(apiPlans.length > 0 ? apiPlans : SAMPLE_PLANS);
    setLoading(false);
  };

  const handleSelectPlan = (plan) => {
    navigate('/recharge', { state: { selectedPlan: plan } });
  };

  const filteredPlans = filter === 'all' ? plans : 
    filter === 'popular' ? plans.filter(plan => plan.popular) :
    filter === 'unlimited' ? plans.filter(plan => plan.category === 'unlimited') :
    filter === 'data' ? plans.filter(plan => plan.category === 'data') :
    filter === 'talktime' ? plans.filter(plan => plan.category === 'talktime') :
    plans.filter(plan => plan.price <= 200);

  if (loading) {
    return (
      <div className={`w-full min-h-[calc(100vh-80px)] ${themeConfig.bg} flex items-center justify-center`}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`w-full min-h-[calc(100vh-80px)] ${themeConfig.bg} p-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${themeConfig.text}`}>Recharge Plans</h1>
          <p className={`text-lg ${themeConfig.textSecondary}`}>Choose from our wide range of prepaid and postpaid plans</p>
        </div>
        
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className={`${themeConfig.cardBg} ${themeConfig.border} border rounded-md p-1 flex space-x-1 min-w-max shadow-sm`}>
            {[
              { id: 'all', label: 'All Plans' },
              { id: 'popular', label: 'Popular' },
              { id: 'unlimited', label: 'Unlimited' },
              { id: 'data', label: 'Data Only' },
              { id: 'talktime', label: 'Talktime' },
              { id: 'budget', label: 'Budget' }
            ].map(filterType => (
              <button
                key={filterType.id}
                onClick={() => setFilter(filterType.id)}
                className={`px-4 py-2 rounded-sm font-medium transition-colors whitespace-nowrap ${
                  filter === filterType.id 
                    ? 'bg-red-600 text-white' 
                    : `${themeConfig.text} hover:${themeConfig.secondary.split(' ')[0]}`
                }`}
              >
                {filterType.label}
              </button>
            ))}
          </div>
        </div>
        
        <PlansGrid plans={filteredPlans} onSelect={handleSelectPlan} />
      </div>
    </div>
  );
}