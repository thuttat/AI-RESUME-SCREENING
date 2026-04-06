import React from 'react';

const TopUserWidget = ({ data }) => {
  const users = data || [
    { id: 1, name: 'Nguyễn Văn A', role: 'Java Backend', activityCount: 15, avatar: 'https://ui-avatars.com/api/?name=Nguyễn+A&background=random' },
    { id: 2, name: 'Trần Thị B', role: 'Data Analyst', activityCount: 12, avatar: 'https://ui-avatars.com/api/?name=Trần+B&background=random' },
    { id: 3, name: 'Lê Hoàng C', role: 'React Native Dev', activityCount: 9, avatar: 'https://ui-avatars.com/api/?name=Lê+C&background=random' },
    { id: 4, name: 'Phạm D', role: 'DevOps Engineer', activityCount: 5, avatar: 'https://ui-avatars.com/api/?name=Phạm+D&background=random' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 font-bold text-lg tracking-wide">Top Ứng Viên</h3>
        <span className="text-sm text-blue-600 cursor-pointer hover:underline font-medium">
          Tất cả
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-all">
            
           
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 text-sm">{user.name}</span>
                <span className="text-xs text-gray-500">{user.role}</span>
              </div>
            </div>

           
            <div className="flex flex-col items-end">
              <span className="font-bold text-blue-600">{user.activityCount}</span>
              <span className="text-[10px] text-gray-400">CV đã tạo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUserWidget;