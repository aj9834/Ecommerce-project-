import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import "../api/authApi"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser(formData);
            setSuccess(res.message);
            setError("");
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <div className="register-wrapper">

            {/* Background blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <div className="register-card">

                {/* LEFT SIDE */}
                <div className="card-left">
                    <div className="brand">
                        <span className="brand-icon">⚡</span>
                        <span className="brand-name">EcomPOC</span>
                    </div>

                    <h3 className="left-title">Start your journey with us</h3>
                    <p className="left-sub">
                        Join thousands of users and experience next-gen e-commerce.
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="card-right">

                    <h2 className="form-title">Create Account</h2>
                    <p className="form-sub">Sign up to get started</p>

                    {error && <div className="alert alert-error">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label>Full Name</label>
                            <div className="input-wrap">
                                <input
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <div className="input-wrap">
                                <input
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-wrap">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button className="submit-btn" type="submit">
                            Register
                        </button>
                    </form>

                    <p className="login-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;