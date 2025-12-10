import { useTheme } from '../context/ThemeContext';

export default function PlanCard({ plan, onSelect }) {
  const { themeConfig } = useTheme();
  
  return (
    <div className={`${themeConfig.cardBg} ${themeConfig.border} border p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-semibold ${themeConfig.text}`}>{plan.name}</h3>
        {plan.popular && (
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs rounded-full font-bold">
            Popular
          </span>
        )}
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className={`text-sm ${themeConfig.textSecondary}`}>Data:</span>
          <span className={`text-sm font-medium ${themeConfig.text}`}>{plan.data}</span>
        </div>
        <div className="flex justify-between">
          <span className={`text-sm ${themeConfig.textSecondary}`}>Validity:</span>
          <span className={`text-sm font-medium ${themeConfig.text}`}>{plan.validity}</span>
        </div>
      </div>

      {plan.benefits && (
        <div className="mb-4">
          <p className={`text-xs font-semibold ${themeConfig.text} mb-2`}>Benefits:</p>
          <div className="space-y-1">
            {plan.benefits.slice(0, 3).map((benefit, index) => (
              <p key={index} className={`text-xs ${themeConfig.textSecondary}`}>• {benefit}</p>
            ))}
            {plan.benefits.length > 3 && (
              <p className={`text-xs ${themeConfig.textSecondary}`}>+{plan.benefits.length - 3} more</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className={`font-bold text-2xl ${themeConfig.text}`}>₹{plan.price}</span>
        <button
          onClick={() => onSelect(plan)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
        >
          Select Plan
        </button>
      </div>
    </div>
  );
}
