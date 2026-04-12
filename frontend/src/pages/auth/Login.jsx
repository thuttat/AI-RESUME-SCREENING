import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/auth.css";
import { Button } from "../../components/common/Button.jsx";
import api from "../../api/AxiosClient";

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
        console.log("--- Bắt đầu gửi yêu cầu đăng nhập ---");
        
        try {
            const payloadToSend = {
                usernameOrEmail: formData.usernameOrEmail.trim(),
                password: formData.password.trim(),
            };

            const response = await api.post("/auth/login", payloadToSend); 
            console.log("Response Full:", response);
            alert("Đăng nhập thành công! Status: " + response.status);

            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                console.log("Dữ liệu nhận được:", data);
                if (data.accessToken) {
                    localStorage.setItem("accessToken", data.accessToken);
                    console.log("Đã lưu accessToken vào LocalStorage");
                } else {
                    alert("Cảnh báo: Server không trả về accessToken!");
                }

                const userRole = data.role || (data.user && data.user.role);
                if (userRole) {
                    localStorage.setItem("role", userRole);
                    console.log("Đã lưu role:", userRole);


                    const roleKey = userRole.toUpperCase();
                    if (roleKey.includes("ADMIN")) {
                        navigate("/admin/dashboard");
                    } else if (roleKey.includes("MANAGER")) {
                        navigate("/manager/dashboard");
                    } else if (roleKey.includes("RECRUITER")) {
                        navigate("/recruiter/dashboard");
                    } else {
                        navigate("/");
                    }
                } else {
                    alert("Lỗi: Không tìm thấy Role trong dữ liệu trả về!");
                }
            }
        } catch (error) {
            console.error("Lỗi Axios:", error);
            const errorMsg = error.response ? 
                `Lỗi ${error.response.status}: ${JSON.stringify(error.response.data)}` : 
                "Không kết nối được tới Backend (Network Error)";
            alert(errorMsg);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="card login-card">
                    <div className="login-header">
                        <div className="login-icon">🔐</div>
                        <h3>Welcome Back</h3>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email or Username</label>
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
                </div>
            </div>
        </div>
    );
}

export default Login;