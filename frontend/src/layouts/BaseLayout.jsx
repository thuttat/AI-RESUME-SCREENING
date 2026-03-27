import { useState } from "react";
import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "../components/common/Sidebar.jsx";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

export default function BaseLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const role = location.pathname.split("/")[1];

    return (
        <div className="app-layout">
            <Sidebar
                currentRole={role}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(!collapsed)}
            />

            <div className="main-container">
                <Header currentRole={role} />

                <main className="content">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}