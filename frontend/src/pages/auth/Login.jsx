import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import { Button } from "../../components/common/Button.jsx";
import api from "../../apis/AxiosClient.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Loader2 } from "lucide-react";

function Login() {
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMsg) setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg("");

        try {
            const payload = {
                usernameOrEmail: formData.usernameOrEmail.trim(),
                password: formData.password.trim(),
            };
            const response = await api.post("/auth/login", payload);

            const { accessToken, role } = response.data;
            // Lấy role trực tiếp hoặc từ object user trả về
            const userRole = role || (response.data.user && response.data.user.role);

            if (accessToken && userRole) {
                await login(accessToken, userRole);

                const roleKey = userRole.toUpperCase();
                if (roleKey.includes("ADMIN")) navigate("/admin/dashboard");
                else if (roleKey.includes("RECRUITER")) navigate("/recruiter/dashboard");
                else if (roleKey.includes("MANAGER") || roleKey.includes("HIRING_MANAGER")) navigate("/manager/dashboard");
                else navigate("/");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrorMsg(error.response?.data?.message || "Invalid username or password!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-icon">🔑</div>
                        <h1>Welcome Back</h1>
                        <p className="text-muted">Login to the system</p>
                    </div>

                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 animate-in fade-in">
                            {errorMsg}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username or Email</label>
                            <input
                                type="text"
                                className="input"
                                name="usernameOrEmail"
                                value={formData.usernameOrEmail}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="input"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Sign In"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;