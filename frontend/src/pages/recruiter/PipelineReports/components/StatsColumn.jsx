import React from 'react';
import { Activity, Target } from 'lucide-react';

export default function StatsColumn({ jobReport }) {
    return (
        <div className="stats-column">
            <div className="mini-stat-card">
                <Activity className="icon" />
                <div>
                    <p>Avg Match Score</p>
                    <h3>{jobReport?.averageMatchScore || 0}%</h3>
                </div>
            </div>

            <div className="mini-stat-card">
                <Target className="icon success" />
                <div>
                    <p>Conversion Rate</p>
                    <h3>
                        {((jobReport?.shortlistCount / jobReport?.totalCandidates) * 100 || 0).toFixed(1)}%
                    </h3>
                </div>
            </div>
        </div>
    );
}