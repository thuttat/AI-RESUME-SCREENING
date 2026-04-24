import React from "react";
import { Card, CardBody } from "../../../../components/common/Card";
import { Briefcase, Clock, UserCheck, Users } from "lucide-react";

export default function StatCards({ stats }) {
    const cards = [
        { label: "Total Jobs Managed", value: stats.total, icon: <Briefcase />, color: "indigo" },
        { label: "Pending Evaluations", value: stats.pending, icon: <Clock />, color: "amber" },
        { label: "Shortlisted", value: stats.shortlisted, icon: <Users />, color: "blue" },
        { label: "Hired", value: stats.hired, icon: <UserCheck />, color: "emerald" }
    ];

    const colorClasses = {
        indigo: "bg-indigo-50 text-indigo-600",
        amber: "bg-amber-50 text-amber-600",
        emerald: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600"
    };

    return (
        <div className="stats-grid">
            {cards.map((card, idx) => (
                <Card key={idx} className="stat-card border-none shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
                    <CardBody className="flex items-center gap-4 p-6">
                        <div className={`p-4 rounded-2xl ${colorClasses[card.color]}`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900 leading-tight">{card.value}</p>
                            <p className="text-sm font-medium text-gray-500 mt-1">{card.label}</p>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}