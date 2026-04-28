import { 
    LayoutDashboard, 
    Briefcase, 
    Upload, 
    Users, 
    Mail, 
    BarChart3, 
    Settings,
    History 
} from "lucide-react";

const createMenu = (role, items) => {
    return items.map(item => ({
        ...item,
        path: `/${role}${item.path}`
    }));
}

export const menuItems = {
    recruiter: createMenu("recruiter", [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/jobs", label: "Job Management", icon: Briefcase },
        { path: "/upload", label: "CV Upload", icon: Upload },
        { path: "/ranking", label: "Candidate Ranking", icon: Users },
        { path: "/email", label: "Email Notifications", icon: Mail },
        { path: "/pipeline", label: "Pipeline Report", icon: BarChart3 },
    ]),
    manager: createMenu("manager", [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/pipeline", label: "Shortlisted Candidates", icon: Users },
        { path: "/email-logs", label: "Hiring History & Emails", icon: History },
        {path: "/email-templates", label: "Email Template Config", icon: Settings}
    ]),
    admin: createMenu("admin", [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/users", label: "User Management", icon: Users },
        { path: "/templates", label: "Template Management", icon: Briefcase },
        { path: "/config", label: "AI Configuration", icon: Settings }
    ]),
};