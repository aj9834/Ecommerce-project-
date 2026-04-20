import { useState } from "react";
import { registerUser } from "../api/authApi";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error on typing
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setServerError("");
    };

    // Frontend validation
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        return newErrors;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setServerError("");

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await registerUser(formData);
            setSuccessMessage(`Welcome, ${response.name}! Registration successful 🎉`);
            setFormData({ name: "", email: "", password: "" });
            setErrors({});
        } catch (err) {
            if (err.error) {
                // e.g. "Email already registered" from backend
                setServerError(err.error);
            } else {
                // Field-level errors from @Valid
                setErrors({
                    name: err.name || "",
                    email: err.email || "",
                    password: err.password || "",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            {/* Background blobs */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            <div className="register-card">
                {/* Left Panel */}
                <div className="card-left">
                    <div className="brand">
                        <span className="brand-icon">⚡</span>
                        <span className="brand-name">EcomPOC</span>
                    </div>
                    <h2 className="left-title">Start your journey with us</h2>
                    <p className="left-sub">
                        Join thousands of users and experience next-gen e-commerce.
                    </p>
                    <ul className="feature-list">
                        <li><span className="check">✓</span> Secure & encrypted</li>
                        <li><span className="check">✓</span> Fast onboarding</li>
                        <li><span className="check">✓</span> 24/7 support</li>
                    </ul>
                </div>

                {/* Right Panel — Form */}
                <div className="card-right">
                    <h1 className="form-title">Create Account</h1>
                    <p className="form-sub">Fill in your details to get started</p>

                    {/* Success message */}
                    {successMessage && (
                        <div className="alert alert-success">{successMessage}</div>
                    )}

                    {/* Server error */}
                    {serverError && (
                        <div className="alert alert-error">{serverError}</div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Name */}
                        <div className={`input-group ${errors.name ? "has-error" : ""}`}>
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrap">
                                <span className="input-icon">👤</span>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Ashish Kumar"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />
                            </div>
                            {errors.name && <span className="error-msg">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className={`input-group ${errors.email ? "has-error" : ""}`}>
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrap">
                                <span className="input-icon">✉️</span>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="ashish@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                            </div>
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>

                        {/* Password */}
                        <div className={`input-group ${errors.password ? "has-error" : ""}`}>
                            <label htmlFor="password">Password</label>
                            <div className="input-wrap">
                                <span className="input-icon">🔒</span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Min 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="error-msg">{errors.password}</span>
                            )}
                            {/* Password strength bar */}
                            {formData.password && (
                                <div className="strength-bar">
                                    <div
                                        className={`strength-fill strength-${
                                            formData.password.length < 6
                                                ? "weak"
                                                : formData.password.length < 10
                                                    ? "medium"
                                                    : "strong"
                                        }`}
                                    />
                                    <span className="strength-label">
                    {formData.password.length < 6
                        ? "Weak"
                        : formData.password.length < 10
                            ? "Medium"
                            : "Strong"}
                  </span>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? <span className="spinner" /> : "Create Account →"}
                        </button>

                        <p className="login-link">
                            Already have an account? <a href="/login">Sign in</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;