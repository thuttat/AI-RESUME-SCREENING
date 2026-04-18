import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardBody } from '../../../../components/common/Card.jsx';
import { ChartColumnBig } from 'lucide-react';

export default function SkillChart({ jobReport }) {

    const data = Object.entries(jobReport?.skillDistribution || {})
        .map(([name, value]) => ({ name, value }));

    return (
        <Card>
            <CardHeader>
                <h3 className="panel-title">
                    <ChartColumnBig size={16} />Candidate Skill Map (AI Extracted)
                </h3>
                <p className="page-subtitle">
                    Most frequently occurring skills in submitted CVs
                </p>
            </CardHeader>

            <CardBody>
                <div className="chart-container-large">
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
}