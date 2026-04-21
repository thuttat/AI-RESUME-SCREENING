import React from "react";
import { Card, CardBody } from "../../../../components/common/Card";
import { Users, Clock, UserCheck, UserX } from "lucide-react";

export default function StatCards({ stats }) {
    const cards = [
        { label: "Total Applicants", value: stats.total, icon: <Users />, color: "indigo" },
        { label: "Pending Review", value: stats.pending, icon: <Clock />, color: "amber" },
        { label: "Hired", value: stats.hired, icon: <UserCheck />, color: "emerald" },
        { label: "Rejected", value: stats.rejected, icon: <UserX />, color: "rose" }
    ];

    const colorClasses = {
        indigo: "bg-indigo-50 text-indigo-600",
        amber: "bg-amber-50 text-amber-600",
        emerald: "bg-emerald-50 text-emerald-600",
        rose: "bg-rose-50 text-rose-600"
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
                            <p className="text-gray-500 text-sm font-semibold tracking-wide">{card.label}</p>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}