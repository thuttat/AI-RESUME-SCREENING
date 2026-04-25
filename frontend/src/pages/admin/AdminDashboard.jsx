import React, { useState, useEffect } from 'react';
import api from "../../apis/AxiosClient";

import CvUploadedChart from './components/CvUploadedChart';
import TopUserWidget from './components/TopUserWidget';
import JobStatsList from './components/JobStatsList';
import KpiCard from './components/KpiCard';
import SimpleListWidget from './components/SimpleListWidget';

import { Users, FileText, Briefcase, Activity } from "lucide-react";

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardMetrics = async () => {
            try {
                setLoading(true);
                const response = await api.get('admin/dashboard');
                setDashboardData({
                    stats: {
                        totalUsers: 1250,
                        totalCvs: 4500,
                        activeJobs: 85,
                        systemLoad: "24%"
                    },
                    chartData: response.data.chartData || [
                        { month: 'Jan', aiCount: 40, normalCount: 24 },
                        { month: 'Feb', aiCount: 30, normalCount: 13 },
                        { month: 'Mar', aiCount: 20, normalCount: 98 },
                        { month: 'Apr', aiCount: 27, normalCount: 39 },
                        { month: 'May', aiCount: 18, normalCount: 48 },
                    ]
                });
            } catch (error) {
                console.error("Data invalid", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardMetrics();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#f8f9fa]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600 font-medium">Loading...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 p-8 w-full bg-[#f8f9fa] min-h-screen overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Admin Overview</h2>
                    <p className="text-gray-500 mt-1">Manage and follow productivities</p>
                </div>
                <div className="text-sm bg-white px-4 py-2 rounded-lg shadow-sm border font-medium text-gray-600">
                    Hôm nay: {new Date().toLocaleDateString('vi-VN')}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard 
                    title="Total User" 
                    value={dashboardData.stats.totalUsers} 
                    icon={<Users size={24} />} 
                    trend="+12%" 
                    color="indigo" 
                />
                <KpiCard 
                    title="CV was parsed" 
                    value={dashboardData.stats.totalCvs} 
                    icon={<FileText size={24} />} 
                    trend="+5.4%" 
                    color="emerald" 
                />
                <KpiCard 
                    title="Hiring status" 
                    value={dashboardData.stats.activeJobs} 
                    icon={<Briefcase size={24} />} 
                    trend="-2%" 
                    color="amber" 
                />
                <KpiCard 
                    title="System loading..." 
                    value={dashboardData.stats.systemLoad} 
                    icon={<Activity size={24} />} 
                    trend="Normal" 
                    color="rose" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CvUploadedChart data={dashboardData.chartData} />
                </div>

                <div className="flex flex-col gap-8">
                    <TopUserWidget />
                    <SimpleListWidget title="Lastest activities" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <JobStatsList />
            </div>
        </div> 
    );
};

export default AdminDashboard;