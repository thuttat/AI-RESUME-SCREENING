import {Button} from "../../components/common/Button.jsx";
import "../../styles/auth.css";

export default function Register() {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="card login-card">
                    <div className="login-header">
                        <div className="login-icon">✍️</div>
                        <h3>Create Account</h3>
                        <p className="text-muted">
                            Join us to start booking
                        </p>
                    </div>

                    <form className="login-form">
                        <div className="form-group">
                            <label>Full name</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Enter your password"
                            />
                        </div>

                        <Button variant="primary" size="md">Sign Up</Button>
                    </form>

                    <div className="login-footer">
                        <p className="text-muted">
                            Already have an account?{" "}
                            <a href="/" className="link-primary">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}