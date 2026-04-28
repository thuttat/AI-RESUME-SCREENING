import { useState, useEffect } from 'react';
import api from "../../apis/AxiosClient.js";
import DashboardMetrics from './dashboard/DashboardMetrics.jsx';
import ApplicationTrend from './dashboard/ApplicationTrend.jsx';
import CandidatesByStage from './dashboard/CandidatesByStage.jsx';
import RecentJobsTable from './dashboard/RecentJobsTable.jsx';

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/admin/dashboard');
                setDashboardData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="!flex !h-screen !items-center !justify-center !bg-[#F8F9FA]">
                <div className="!animate-spin !rounded-full !h-12 !w-12 !border-b-2 !border-blue-600"></div>
            </div>
        );
    }

    const applicationTrendData = dashboardData?.cvUploadedChart?.map(item => ({
        date: `Month ${item.month}`,
        applications: item.totalCount
    })) || [];

    const cvTypeData = [
        { name: 'AI Screened CVs', value: dashboardData?.totalAiCv || 0, color: '#4F46E5' },
        { name: 'Normal CVs', value: dashboardData?.totalNormalCv || 0, color: '#10B981' }
    ];

    const topUsers = dashboardData?.topActiveUsers || [];

    return (
        <div className="!flex !flex-col !h-screen !overflow-hidden">
            <div className="!flex-1 !overflow-y-auto !bg-[#F8F9FA] !p-8">

                <DashboardMetrics data={dashboardData} />

                <div className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-8 !mb-8">
                    <ApplicationTrend data={applicationTrendData} />
                    <CandidatesByStage data={cvTypeData} title="CV Types Breakdown" />
                </div>

                <RecentJobsTable users={topUsers} />

            </div>
        </div>
    );
}