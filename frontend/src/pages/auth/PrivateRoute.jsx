import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    // SỬA: Lấy đúng "accessToken" cho khớp với file Login
    const token = localStorage.getItem("accessToken");
    const currentRole = localStorage.getItem("role");

    // Nếu không có token hoặc role, xóa sạch và quay về trang chủ (Login)
    if (!token || !currentRole) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        return <Navigate to="/" replace />;
    }

    // Kiểm tra quyền truy cập: 
    // Trả về true nếu role hiện tại (ví dụ ROLE_ADMIN) chứa một trong các role cho phép (ADMIN)
    const hasAccess = allowedRoles.some(role => 
        currentRole.toUpperCase().includes(role.toUpperCase())
    );

    if (!hasAccess) {
        console.warn("Unauthorized! User role:", currentRole, "Required roles:", allowedRoles);
        // Nếu sai quyền, đẩy về trang chủ chứ không nhất thiết phải xóa token
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;