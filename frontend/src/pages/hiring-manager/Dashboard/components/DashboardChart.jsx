import React from "react";
import {
    PieChart, Pie, Cell, Tooltip,
    ResponsiveContainer, Legend
} from "recharts";
import { Card, CardHeader, CardBody } from "../../../../components/common/Card";

const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function DashboardChart({ chartData }) {
    const data = Object.entries(chartData || {}).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <Card className="shadow-sm border-none h-full">
            <CardHeader className="border-b p-4">
                <h2 className="font-bold text-gray-800">Applications by Job</h2>
            </CardHeader>
            <CardBody className="flex items-center justify-center p-4">
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
}