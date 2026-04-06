import React from 'react';

const SimpleListWidget = ({ title, items }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col w-full">
      
      <div className="bg-[#20222a] p-3 rounded-t-sm">
        <h3 className="text-white text-sm font-medium">{title}</h3>
      </div>
      
      <div className="flex flex-col">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="p-3 border-b border-gray-100 last:border-b-0 text-gray-700 text-sm hover:bg-gray-50"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleListWidget;