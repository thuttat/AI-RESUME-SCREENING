import { TrendingUp } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function ApplicationTrend({ data }) {
    return (
        <div className="lg:!col-span-2 !bg-white !rounded-2xl !p-7 !shadow-sm !border !border-gray-100">
            <div className="!flex !items-center !justify-between !mb-6">
                <div>
                    <h3 className="!text-lg !font-bold !text-gray-900 !m-0">Application Trend</h3>
                    <p className="!text-sm !text-gray-500 !mt-1.5 !m-0">Last 30 days</p>
                </div>
                <div className="!flex !items-center !gap-2 !text-green-600">
                    <TrendingUp size={18} className="!shrink-0" />
                    <span className="!text-sm !font-semibold">+15% increase</span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="applications" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}