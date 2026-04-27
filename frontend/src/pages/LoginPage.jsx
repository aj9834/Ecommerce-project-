import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);

        try {
            // 👉 Replace this with real API later
            console.log("Login Data:", formData);

            // Fake success (for now)
            alert("Login successful 🚀");

        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h1 style={styles.title}>Login</h1>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    {/* Password */}
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <span
                            style={styles.eye}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    <button type="submit" style={styles.button}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <p style={styles.linkText}>
                    Don’t have an account?{" "}
                    <Link to="/" style={styles.link}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

const styles = {
    wrapper: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
    },
    card: {
        background: "#1e293b",
        padding: "30px",
        borderRadius: "10px",
        width: "350px",
        color: "white",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        border: "none",
    },
    button: {
        width: "100%",
        padding: "10px",
        background: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginBottom: "10px",
    },
    linkText: {
        marginTop: "15px",
        textAlign: "center",
    },
    link: {
        color: "#818cf8",
    },
    eye: {
        position: "absolute",
        right: "10px",
        top: "10px",
        cursor: "pointer",
    },
};