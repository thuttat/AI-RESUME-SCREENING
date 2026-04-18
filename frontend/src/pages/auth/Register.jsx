import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import api from "../../apis/AxiosClient.js";
import { Button } from "../../components/common/Button.jsx";
import "../../styles/auth.css";
import { Loader2, UserPlus } from "lucide-react";

function Register() {
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMsg) setErrorMsg("");
    };

    const validateForm = () => {
        if (formData.password.length < 6) {
            setErrorMsg("Password need to have at least 6 characters");
            return false;
        }
        if (formData.password !== formData.confirm) {
            setErrorMsg("confirm password don't match!");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMsg("Invalid email format");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const payload = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password.trim(),
                fullname: formData.fullname.trim(),
            };

            const response = await api.post("/auth/register", payload);
            
            if (response.status === 201 || response.status === 200) {
                navigate("/", { state: { message: "Successfully! Sign in now." } });
            }
        } catch (error) {
            console.error("Registration Error:", error);
            setErrorMsg(error.response?.data?.message || "Fail to register, retry pls!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-icon">
                            <UserPlus size={32} />
                        </div>
                        <h1>Create Account</h1>
                        <p className="text-muted">Join with us</p>
                    </div>

                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 animate-in fade-in">
                            {errorMsg}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="input"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="input"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
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

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="input"
                                name="confirm"
                                value={formData.confirm}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Sign Up"}
                        </Button>
                    </form>

                    <div className="login-footer">
                        <p className="text-muted">
                            Already have an account?{" "}
                            <Link to="/" className="link-primary font-bold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;