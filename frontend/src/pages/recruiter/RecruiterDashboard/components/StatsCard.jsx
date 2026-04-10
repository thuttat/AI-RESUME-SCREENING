import React from 'react';
import { Card, CardBody } from '../../../../components/common/Card.jsx';
import { Briefcase, Users, CheckCircle, Clock } from 'lucide-react';

const statsData = [
    { label: 'Active Jobs', value: '24', icon: Briefcase },
    { label: 'Total Candidates', value: '487', icon: Users },
    { label: 'Shortlisted', value: '89', icon: CheckCircle },
    { label: 'Pending Review', value: '156', icon: Clock },
];

const StatsCard = () => {
    return (
        <div className="grid-4">
            {statsData.map((stat, index) => {
                const Icon = stat.icon;

                return (
                    <Card key={index}>
                        <CardBody className="stats-card">
                            <div className="icon-box">
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