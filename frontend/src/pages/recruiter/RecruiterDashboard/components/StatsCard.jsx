import React from 'react';
import { Card, CardBody } from '../../../../components/common/Card.jsx';
import { Briefcase, Users, CheckCircle, Clock } from 'lucide-react';

const StatsCard = ({ stats }) => {
    const safeStats = stats || {};

    const displayData = [
        { label: 'Active Jobs', value: safeStats.activeJobs || 0, icon: Briefcase, color: 'blue' },
        { label: 'Total Candidates', value: safeStats.totalCandidates || 0, icon: Users, color: 'purple' },
        { label: 'Shortlisted', value: safeStats.shortlistedCount || 0, icon: CheckCircle, color: 'green' },
        { label: 'Pending Review', value: safeStats.pendingReviewCount || 0, icon: Clock, color: 'orange' },
    ];

    return (
        <div className="grid-4">
            {displayData.map((stat, index) => {
                const Icon = stat.icon;

                return (
                    <Card key={index}>
                        <CardBody className="stats-card">
                            <div className={`icon-box icon-${stat.color}`}>
                                <Icon size={22} />
                            </div>
                            <div>
                                <p className="stats-value">{stat.value}</p>
                                <p className="stats-label">{stat.label}</p>
                            </div>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    );
};

export default StatsCard;