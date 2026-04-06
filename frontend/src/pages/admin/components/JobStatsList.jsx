import React from 'react';

const JobStatsList = ({ data }) => {
  const jobs = data || [
    { id: 1, title: 'Backend Engineer (Spring Boot)', applies: 142, status: 'Hot' },
    { id: 2, title: 'Frontend Developer (ReactJS)', applies: 98, status: 'Active' },
    { id: 3, title: 'Data Engineer (Python)', applies: 75, status: 'Active' },
    { id: 4, title: 'DevOps Engineer (Docker/Jenkins)', applies: 45, status: 'Closing' },
    { id: 5, title: 'Fullstack Developer', applies: 20, status: 'Active' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full h-full">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 font-bold text-lg tracking-wide">Top Job Thu Hút CV</h3>
        <span className="text-sm text-blue-600 cursor-pointer hover:underline font-medium">
          Xem chi tiết
        </span>
      </div>

      
      <div className="flex flex-col gap-3">
        {jobs.map((job, index) => (
          <div 
            key={job.id} 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all border border-transparent hover:border-gray-200"
          >
    
            <div className="flex items-center gap-4">
              <span className={`font-bold w-6 text-center ${index < 3 ? 'text-red-500' : 'text-gray-400'}`}>
                #{index + 1}
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 text-sm">{job.title}</span>
                <span className="text-xs text-gray-500 mt-0.5">
                  Trạng thái: <span className={job.status === 'Closing' ? 'text-orange-500' : 'text-green-500'}>{job.status}</span>
                </span>
              </div>
            </div>

           
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="font-bold text-gray-800">{job.applies}</span>
                <span className="text-[10px] text-gray-400 uppercase">CV đã nộp</span>
              </div>
              {job.status === 'Hot' && (
                <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                HOT
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobStatsList;