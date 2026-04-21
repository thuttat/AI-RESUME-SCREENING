import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../apis/AxiosClient.js"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(localStorage.getItem("role") || null);
    const [loading, setLoading] = useState(true);

    const login = async (token, userRole) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", userRole);
        setRole(userRole);
        
        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
            return res.data;
        } catch (error) {
            console.error("Failed to get user information:", error);
            logout();
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        setUser(null);
        setRole(null);
        window.location.href = "/"; 
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const response = await api.get('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.log("Token expired or invalid:", error);
                    logout();
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading, login, logout, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};