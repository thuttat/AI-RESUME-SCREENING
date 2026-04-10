import React from 'react';
import { Card, CardHeader, CardBody } from '../../../../components/common/Card.jsx';

const activities = [
    { action: 'New job posted', job: 'React Dev', time: '2h ago' },
    { action: 'CV uploaded', candidate: 'Sarah', time: '3h ago' },
];

const RecentActivities = () => {
    return (
        <Card>
            <CardHeader>
                <h3>Recent Activities</h3>
            </CardHeader>

            <CardBody>
                <div className="activity-list">
                    {activities.map((item, index) => (
                        <div key={index} className="activity-item">
                            <div className="dot"></div>

                            <div>
                                <p className="activity-text">
                                    <strong>{item.action}</strong>
                                    {item.job && ` - ${item.job}`}
                                    {item.candidate && ` - ${item.candidate}`}
                                </p>
                                <p className="activity-time">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export default RecentActivities;