import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CvUploadedChart = ({ data }) => {

    const formatChartData = (apiData) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        const fullYear = Array.from({ length: 12 }, (_, i) => ({
            name: monthNames[i],
            aiCount: 0,
            normalCount: 0
        }));

        if (apiData && Array.isArray(apiData)) {
            apiData.forEach(item => {
                if (item.month >= 1 && item.month <= 12) {
                    fullYear[item.month - 1] = {
                        name: monthNames[item.month - 1],
                        aiCount: item.aiCount || 0,
                        normalCount: item.normalCount || 0
                    };
                }
            });
        }
        return fullYear;
    };

    const chartData = formatChartData(data);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 relative w-full shadow-sm">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-[#ff4d4f] font-bold text-sm uppercase tracking-wider">CV Uploaded</h3>
                
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> All</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span> NORMAL CV</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4f]"></span> AI CV</span>
                    <span className="text-gray-400 cursor-pointer text-lg font-bold">...</span>
                </div>
            </div>

            
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={12}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                        <Tooltip cursor={{ fill: '#f0f0f0' }} />
                       
                        <Bar dataKey="aiCount" stackId="a" fill="#ff4d4f" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="normalCount" stackId="a" fill="#20222a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CvUploadedChart;