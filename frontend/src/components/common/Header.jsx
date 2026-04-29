import React from "react";
import { Bell, Search, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../styles/Header.css";
import { Button } from "./Button.jsx";
import { menuItems } from "../../utils/MenuConfig.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, role, logout } = useAuth();

    const getPageTitle = () => {
        const allMenu = [
            ...menuItems.recruiter,
            ...menuItems.admin,
            ...menuItems.manager
        ];
        const activeItem = allMenu.find(item => location.pathname.endsWith(item.path));
        return activeItem ? activeItem.label : "Dashboard";
    }

    const title = getPageTitle();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="header">
            <div className="header-left">
                <h2>{title}</h2>
                <p>{role ? role.toUpperCase() : "USER"} PANEL</p>
            </div>

            <div className="header-right">
                <div className="search-box">
                    <Search size={16} />
                    <input placeholder="Search anything..." />
                </div>

                <button className="icon-btn">
                    <Bell size={18} />
                    <span className="dot"></span>
                </button>

                <div className="user">
                    <div className="user-info">
                        <h4>{user ? (user.fullname || user.username) : "Loading..."}</h4>
                        <span>{user ? user.email : ""}</span>
                    </div>
                    <div className="avatar">
                        <User size={16} />
                    </div>
                </div>

                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}