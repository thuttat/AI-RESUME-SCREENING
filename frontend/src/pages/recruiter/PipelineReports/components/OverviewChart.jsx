import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader, CardBody } from '../../../../components/common/Card.jsx';
import { ChartPie } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', "#ffcf00", '#ef4444' ];

export default function OverviewChart({ globalStats }) {
    const pieData = [
        { name: 'Pending', value: globalStats.aiProcessedCount },
        { name: 'Shortlisted', value: globalStats.shortlistedCount },
        { name: 'Hired', value: globalStats.hiredCount },
        { name: 'Rejected', value: globalStats.rejectedCount }
    ];

    return (
        <Card className="overview-chart-card">
            <CardHeader>
                <h3 className="panel-title">
                    <ChartPie size={16} />Application Overview
                </h3>
            </CardHeader>

            <CardBody>
                <div className="chart-container">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-legend">
                    {pieData.map((item, i) => (
                        <div key={i} className="legend-item">
                            {item.name}: <strong>{item.value}</strong>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}