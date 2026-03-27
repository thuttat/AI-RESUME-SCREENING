import { Bell, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import "./../styles/Header.css";
import {Button} from "./Button.jsx";

const titles = {
    "/recruiter/dashboard": "Dashboard",
    "/recruiter/jobs": "Job Management",
    "/recruiter/upload": "CV Upload",
    "/recruiter/ranking": "Candidate Rankings",
    "/recruiter/email": "Email Notifications",
    "/recruiter/pipeline": "Pipeline Reports"
};

export default function Header({ currentRole }) {
    const location = useLocation();
    const title = titles[location.pathname] || "Dashboard";

    return (
        <div className="header">
            <div className="header-left">
                <h2>{title}</h2>
                <p>{currentRole.toUpperCase()} PANEL</p>
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
                        <h4>John Doe</h4>
                        <span>{currentRole}</span>
                    </div>
                    <div className="avatar">
                        <User size={16} />
                    </div>
                </div>

                <Button variant="outline-danger" size="sm">
                    Logout
                </Button>
            </div>
        </div>
    );
}