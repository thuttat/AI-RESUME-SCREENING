import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../apis/AxiosClient";
import { Loader2, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "../../../components/common/Button";

import StatCards from "./components/StatCards";
import RecentApplications from "./components/RecentApplication";
import DashboardChart from "./components/DashboardChart";

import "./HiringManagerDashboard.css";

export default function HiringManagerDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [dashboardData, setDashboardData] = useState({
        totalJobsManaged: 0,
        pendingEvaluations: 0,
        shortlistedCount: 0,
        hiredCount: 0,
        recentActivities: [],
        statsChart: {}
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await api.get("/manager/dashboard");
            setDashboardData(response.data);
        } catch (error) {
            console.error("invalid dashboard data:", error);
            alert("cannot upload dashboard data!");
        } finally {
            setLoading(false);
        }
    };
    const handleUpdateStatus = async (appId, newStatus) => {
        try {
            await api.patch(`/applications/${appId}/status`, { status: newStatus });
            fetchDashboardData();
        } catch (error) {
            console.error("Update error:", error);
            alert("Cannot update!");
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    const statsProps = {
        total: dashboardData.totalJobsManaged,
        pending: dashboardData.pendingEvaluations,
        hired: dashboardData.hiredCount,
        shortlisted: dashboardData.shortlistedCount
    };

    return (
        <div className="hm-dashboard-container">
            <header className="dashboard-header flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <LayoutDashboard className="text-primary" /> Hiring Overview
                    </h1>
                    <p className="text-gray-500">Hiring stats</p>
                </div>
                <Button onClick={() => navigate("/manager/pipeline")} variant="primary">
                    Go to Pipeline <ArrowRight size={16} />
                </Button>
            </header>

            <StatCards stats={statsProps} />

            <div className="dashboard-main-grid grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                <div className="lg:col-span-1">
                    <DashboardChart chartData={dashboardData.statsChart} />
                </div>
                <div className="lg:col-span-2">
                    <RecentApplications
                        applications={dashboardData.recentActivities}
                        onUpdateStatus={handleUpdateStatus}
                        onViewAll={() => navigate("/manager/pipeline")}
                    />
                </div>
            </div>
        </div>
    );
}