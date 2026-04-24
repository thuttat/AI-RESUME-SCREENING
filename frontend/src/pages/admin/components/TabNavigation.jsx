import { clsx } from 'clsx';

export default function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'job-template', label: 'Job Template' },
    { id: 'email-template', label: 'Email Template' }
  ];

  return (
    <div className="flex gap-8 border-b border-slate-200 px-2 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'pb-4 px-2 relative transition-all duration-200 text-sm font-semibold',
            activeTab === tab.id 
              ? 'text-blue-600' 
              : 'text-slate-500 hover:text-slate-800'
          )}
        >
          {tab.label}
          
          {activeTab === tab.id && (
            <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>
          )}
        </button>
      ))}
    </div>
  );
}