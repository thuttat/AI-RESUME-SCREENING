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
import "../styles/Sidebar.css";
import {Button} from "./Button.jsx";
import {menuItems} from "../../utils/MenuConfig.js";

export default function Sidebar({ currentRole, collapsed, onToggleCollapse }) {
    const roleKey = currentRole ? currentRole : "";

    const items = menuItems[roleKey] || [];

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
                    const path = `/${roleKey}${item.path}`;

                    return (
                        <NavLink
                            key={path}
                            to={path}
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