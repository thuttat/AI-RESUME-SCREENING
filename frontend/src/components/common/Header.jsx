import { Bell, Search, User } from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import "./../styles/Header.css";
import {Button} from "./Button.jsx";
import {useEffect, useState} from "react";
import AxiosClient from "../../api/AxiosClient.js";
import {menuItems} from "../../utils/MenuConfig.js";

export default function Header({ currentRole }) {
    const location = useLocation();
    const navigate = useNavigate();

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

    const [userInfo, setUserInfo] = useState({
        fullname: "Loading...",
        email: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await AxiosClient.get("/api/auth/me");
                setUserInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/", { replace: true });
    };

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
                        <h4>{userInfo.fullname || "User"}</h4>
                        <span>{userInfo.email}</span>
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