import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { role, loading } = useAuth();
    const location = useLocation();
    const token = localStorage.getItem("accessToken");

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Verifying access...</p>
                </div>
            </div>
        );
    }

    // 2. Kiểm tra Token
    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!role) {
        return <Navigate to="/" replace />;
    }

    const userRole = role.toUpperCase();

    const hasAccess = allowedRoles.some(r =>
        userRole.includes(r.toUpperCase())
    );

    if (!hasAccess) {
        console.warn(`[Security] Access Denied for Role: ${userRole}. Required: ${allowedRoles}`);
        let redirectPath = "/";
        if (userRole.includes("ADMIN")) {
            redirectPath = "/admin/dashboard";
        } else if (userRole.includes("RECRUITER")) {
            redirectPath = "/recruiter/dashboard";
        } else if (userRole.includes("MANAGER") || userRole.includes("HIRING_MANAGER")) {
            redirectPath = "/manager/dashboard";
        }

        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default PrivateRoute;