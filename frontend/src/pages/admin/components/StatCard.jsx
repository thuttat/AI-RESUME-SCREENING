import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

export default function StatCard({ title, value, trend, icon: Icon, iconBgColor = 'bg-blue-100', iconColor = 'text-blue-600' }) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="bg-white !rounded-xl !p-6 shadow-sm !border !border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 !mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 !mb-2">{value}</h3>

          {trend !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive && (
                <>
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-sm font-semibold text-green-600">+{trend}%</span>
                </>
              )}
              {isNegative && (
                <>
                  <TrendingDown size={16} className="text-red-600" />
                  <span className="text-sm font-semibold text-red-600">{trend}%</span>
                </>
              )}
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={clsx('w-12 h-12 rounded-lg flex items-center justify-center', iconBgColor)}>
            <Icon size={24} className={iconColor} />
          </div>
        )}
      </div>
    </div>
  );
}
