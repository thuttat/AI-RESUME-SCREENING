import React, { useEffect, useState } from 'react';
import StatsCard from './components/StatsCard.jsx';
import ChartsSection from './components/ChartsSection.jsx';
import RecentActivities from './components/RecentActivities.jsx';
import { DashboardService } from '../../../apis/DashboardService.js';
import { Loader2, AlertCircle } from 'lucide-react';
import "./RecruiterDashboard.css";

export default function RecruiterDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                const response = await DashboardService.getRecruiterStats();
                setData(response.data);
            } catch (err) {
                setError("Failed to load dashboard data. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) return (
        <div className="dashboard-state-container">
            <Loader2 className="spinner primary-icon" size={40} />
            <p>Gathering your recruitment insights...</p>
        </div>
    );

    if (error) return (
        <div className="dashboard-state-container error">
            <AlertCircle size={40} />
            <p>{error}</p>
        </div>
    );

    return (
        <div className="dashboard-container">
            <div>
                    <h1>My Recruitment Overview</h1>
                    <p className="page-subtitle">Real-time statistics for your active job postings and candidates</p>
            </div>


            <StatsCard stats={data} />

            <ChartsSection
                monthlyData={data.monthlyApplications}
                jobStatusData={data.jobStatusDistribution}
            />

            <RecentActivities activities={data.recentActivities} />
        </div>
    );
}