import React from 'react';
import { Card, CardHeader, CardBody } from '../../../../components/common/Card.jsx';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartsSection = ({ monthlyData = [], jobStatusData = [] }) => {
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
                            <Bar dataKey="applications" fill="#4f46e5" radius={[4, 4, 0, 0]} />
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
                            <Pie data={jobStatusData} dataKey="value" nameKey="name">
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