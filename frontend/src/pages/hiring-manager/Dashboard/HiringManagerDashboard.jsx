import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../apis/AxiosClient";
import { Loader2, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "../../../components/common/Button";

import StatCards from "./components/StatCards";
import RecentApplications from "./components/RecentApplication";

import "./HiringManagerDashboard.css";

export default function HiringManagerDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, pending: 0, hired: 0, rejected: 0 });
    const [recentApps, setRecentApps] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get("/applications");
            const data = response.data.content || response.data || [];

            setStats({
                total: data.length,
                pending: data.filter(a => a.status === 'PENDING').length,
                hired: data.filter(a => a.status === 'HIRED').length,
                rejected: data.filter(a => a.status === 'REJECT').length
            });

            const sorted = [...data].sort((a, b) => b.id - a.id);
            setRecentApps(sorted.slice(0, 5));
        } catch (error) {
            console.error("Dashboard Load Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (appId, newStatus) => {
        try {
            await api.patch(`/applications/${appId}/status`, { status: newStatus });
            fetchData(); 
        } catch (error) {
            alert("Update failed!");
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

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

            <StatCards stats={stats} />

            <RecentApplications 
                applications={recentApps} 
                onUpdateStatus={handleUpdateStatus}
                onViewAll={() => navigate("/manager/pipeline")}
            />
        </div>
    );
}