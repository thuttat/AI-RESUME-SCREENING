import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function CandidatesByStage({ data }) {
    return (
        <div className="!bg-white !rounded-2xl !p-7 !shadow-sm !border !border-gray-100">
            <div className="!mb-6">
                <h3 className="!text-lg !font-bold !text-gray-900 !m-0">Candidates by Stage</h3>
                <p className="!text-sm !text-gray-500 !mt-1.5 !m-0">Current pipeline</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="!mt-5 !space-y-3">
                {data.map((item, index) => (
                    <div key={index} className="!flex !items-center !justify-between">
                        <div className="!flex !items-center !gap-3">
                            <div className="!w-3 !h-3 !rounded-full !shrink-0" style={{ backgroundColor: item.color }}></div>
                            <span className="!text-[14px] !text-gray-700 font-medium">{item.name}</span>
                        </div>
                        <span className="!text-[14px] !font-bold !text-gray-900">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}