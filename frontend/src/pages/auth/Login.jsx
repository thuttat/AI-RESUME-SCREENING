import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../../styles/auth.css";
import { Button } from "../../components/common/Button.jsx";

function Login() {
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payloadToSend = {
                usernameOrEmail: formData.usernameOrEmail.trim(),
                password: formData.password.trim(),
            };
            
           
            const response = await axios.post("http://localhost:8080/api/auth/login", payloadToSend);
            
            if (response.status === 200) {
                localStorage.setItem("token", response.data.accessToken);
                const userRole = response.data.user.role;
                localStorage.setItem("role", userRole);
                
                switch (userRole) {
                    case "ADMIN":
                        navigate("/admin/dashboard");
                        break;
                    case "HIRING_MANAGER":
                        navigate("/manager/dashboard");
                        break;
                    case "RECUITER":
                        navigate("/recruiter/dashboard");
                        break;
                    default:
                        navigate("/");
                        break;
                }
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="card login-card">
                    <div className="login-header">
                        <div className="login-icon">🔐</div>
                        <h3>Welcome Back</h3>
                        <p className="text-muted">
                            Sign in to book your sports court
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email hoặc Username</label>
                            <input
                                type="text" 
                                className="input"
                                placeholder="you@example.com"
                                name="usernameOrEmail" 
                                value={formData.usernameOrEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" variant="primary" size="md">Sign In</Button>
                    </form>

                    <div className="login-footer">
                        <p className="text-muted">
                            Don't have an account?{" "}
                            <a href="/register" className="link-primary">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;