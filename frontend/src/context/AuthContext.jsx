/* eslint-disable react-refresh/only-export-components */
import React, {createContext, useContext, useEffect, useState} from "react";
import AxiosClient from "../apis/AxiosClient.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(localStorage.getItem("role") || null);
    const [loading, setLoading] = useState(true);

    const login = (token, userRole) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", userRole);
        setRole(userRole);
        AxiosClient.get("/auth/me").then(res => setUser(res.data)).catch(console.log);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        setUser(null);
        setRole(null);
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const response = await AxiosClient('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.log("Error token or expired: " + error);
                    logout();
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);