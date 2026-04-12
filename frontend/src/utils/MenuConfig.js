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
    items.map(item => ({
        ...item,
        path: `/${role}${item.path}`
    }));
    return items;
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
        { path: "manager/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "manager/pipeline", label: "Shortlisted Candidates", icon: Users }, 
        { path: "manager/email-logs", label: "Hiring History & Emails", icon: History }, 
        {path: "manager//email-templates", label: "Email Template Config", icon: Settings}
    ]),
    admin: createMenu("admin", [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/users", label: "User Management", icon: Users },
        { path: "/templates", label: "Template Management", icon: Briefcase },
        { path: "/config", label: "AI Configuration", icon: Settings }
    ]),
};