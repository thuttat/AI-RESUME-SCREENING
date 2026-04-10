import React from 'react';
import StatsCard from './components/StatsCard.jsx';
import ChartsSection from './components/ChartsSection.jsx';
import RecentActivities from './components/RecentActivities.jsx';
import "./RecruiterDashboard.css";

export default function RecruiterDashboard() {
    return (
        <div className="dashboard-container">
            <StatsCard />
            <ChartsSection />
            <RecentActivities />
        </div>
    );
}