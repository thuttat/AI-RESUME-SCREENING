import React from 'react';
import { Card, CardHeader, CardBody } from '../../../../components/common/Card.jsx';
import {BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const monthlyData = [
    { month: 'Jan', applications: 45 },
    { month: 'Feb', applications: 52 },
    { month: 'Mar', applications: 68 },
];

const jobStatusData = [
    { name: 'Open', value: 14, color: '#4f46e5' },
    { name: 'Closed', value: 2, color: '#6b7280' },
];

const ChartsSection = () => {
    return (
        <div className="grid-2">
            <Card>
                <CardHeader>
                    <h3>Monthly Applications</h3>
                </CardHeader>
                <CardBody>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="applications" fill="#4f46e5" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <h3>Job Status</h3>
                </CardHeader>
                <CardBody>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={jobStatusData} dataKey="value">
                                {jobStatusData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </div>
    );
};

export default ChartsSection;