import { Briefcase, Users, Calendar, Clock } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';

export default function DashboardMetrics({ data }) {
    if (!data) {
        return null;
    }

    return (
        <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-6 !mb-8">
            <StatCard
                title="Total Active Jobs"
                value={data.totalJobPosting}
                trend={5}
                icon={Briefcase}
                iconBgColor="bg-blue-100"
                iconColor="text-blue-600"
            />
            <StatCard
                title="Active Users"
                value={data.activeUsers}
                trend={12}
                icon={Users}
                iconBgColor="bg-purple-100"
                iconColor="text-purple-600"
            />
            <StatCard
                title="Total AI CVs"
                value={data.totalAiCv}
                trend={8}
                icon={Calendar}
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
            />
            <StatCard
                title="Total Normal CVs"
                value={data.totalNormalCv}
                trend={-3}
                icon={Clock}
                iconBgColor="bg-orange-100"
                iconColor="text-orange-600"
            />
        </div>
    );
}

