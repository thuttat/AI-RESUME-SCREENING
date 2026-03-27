import {
    LayoutDashboard,
    Briefcase,
    Upload,
    Users,
    Mail,
    BarChart3,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "./../styles/Sidebar.css";
import Button from "./Button.jsx";

const createMenu = (role, items) =>
    items.map(item => ({
        ...item,
        path: `/${role}${item.path}`
    }));

const menuItems = {
    recruiter: createMenu("recruiter", [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/jobs", label: "Job Management", icon: Briefcase },
        { path: "/upload", label: "CV Upload", icon: Upload },
        { path: "/ranking", label: "Candidate Ranking", icon: Users },
        { path: "/email", label: "Email", icon: Mail },
        { path: "/pipeline", label: "Pipeline", icon: BarChart3 },
    ]),
    manager: createMenu("manager", [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/shortlisted", label: "Shortlisted Candidates", icon: Users },
        { path: "/history", label: "Hiring History", icon: BarChart3 },
        { path: "/profile", label: "Candidate History", icon: BarChart3 },
    ]),
    admin: createMenu("admin", [
        { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/admin/users", label: "User Management", icon: Users },
        { path: "/admin/templates", label: "Template Management", icon: Briefcase },
        { path: "/admin/config", label: "AI Configuration", icon: Upload }
    ]),
};


export default function Sidebar({ currentRole, collapsed, onToggleCollapse }) {
    const items = menuItems[currentRole] || [];
    console.log(items);

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                {!collapsed && <h1 className="logo">🤖 AI Resume</h1>}

                <Button variant="ghost" size="sm" onClick={onToggleCollapse}>
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </Button>
            </div>

            <nav className="sidebar-menu">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `menu-item ${isActive ? "active" : ""}`
                            }
                        >
                            <Icon size={20} />
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
}