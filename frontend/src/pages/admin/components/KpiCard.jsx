import React from 'react';

const KpiCard = ({ title, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col h-full">
      <div className="p-3 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-gray-700 text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
      </div>
      
      <div className="flex items-center justify-center p-6 flex-grow">
        <div className="bg-[#20222a] text-white text-xl font-bold px-8 py-2 rounded-sm shadow-sm">
          {value}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;