import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import PlansGrid from '../components/PlansGrid';
import SAMPLE_PLANS from '../data/plans';

export default function Plans() {
  const [plans] = useState(SAMPLE_PLANS);
  const [filter, setFilter] = useState('all');
  const { themeConfig } = useTheme();
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    navigate('/recharge', { state: { selectedPlan: plan } });
  };

  const filteredPlans = filter === 'all' ? plans : 
    filter === 'popular' ? plans.filter(plan => plan.popular) :
    filter === 'unlimited' ? plans.filter(plan => plan.category === 'unlimited') :
    filter === 'data' ? plans.filter(plan => plan.category === 'data') :
    filter === 'talktime' ? plans.filter(plan => plan.category === 'talktime') :
    plans.filter(plan => plan.price <= 200);

  return (
    <div className={`w-full min-h-[calc(100vh-80px)] ${themeConfig.bg} p-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${themeConfig.text}`}>Choose Your Plan</h1>
          <p className={`text-lg ${themeConfig.textSecondary}`}>Select the perfect recharge plan for your needs</p>
        </div>
        
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className={`${themeConfig.cardBg} ${themeConfig.border} border rounded-lg p-1 flex space-x-1 min-w-max`}>
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
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 whitespace-nowrap ${
                  filter === filterType.id 
                    ? 'bg-blue-600 text-white' 
                    : `${themeConfig.text} hover:bg-blue-100 dark:hover:bg-blue-900`
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
