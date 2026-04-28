import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { role, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Verifying access...</p>
                </div>
            </div>
        );
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!role) {
        return <Navigate to="/" replace />;
    }

    const userRole = role.toUpperCase();

    const hasAccess = allowedRoles.map(r => r.toUpperCase()).includes(userRole);

    if (!hasAccess) {
        console.warn(`[Security] Access Denied for Role: ${userRole}. Required: ${allowedRoles}`);

        let redirectPath = "/";
        if (userRole === "ADMIN") {
            redirectPath = "/admin/dashboard";
        } else if (userRole === "RECRUITER") {
            redirectPath = "/recruiter/dashboard";
        } else if (userRole === "HIRING_MANAGER") {
            redirectPath = "/manager/dashboard";
        }

        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default PrivateRoute;