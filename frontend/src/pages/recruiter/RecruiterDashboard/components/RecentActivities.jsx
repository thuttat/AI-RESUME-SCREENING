import React from 'react';
import { Card, CardHeader, CardBody } from '../../../../components/common/Card.jsx';

const RecentActivities = ({ activities = [] }) => {
    const formatTime = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('vi-VN', {
            hour: '2-digit', minute: '2-digit',
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    return (
        <Card>
            <CardHeader>
                <h3>Recent Activities</h3>
            </CardHeader>

            <CardBody>
                <div className="activity-list">
                    {activities.length === 0 ? (
                        <p className="empty-text">No recent activities found.</p>
                    ) : (
                        activities.map((item, index) => (
                            <div key={index} className="activity-item">
                                <div>
                                    <p className="activity-text">
                                        <strong>{item.action}</strong>
                                        {item.targetName && ` - ${item.targetName}`}
                                    </p>
                                    <p className="activity-time">{formatTime(item.timestamp)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default RecentActivities;