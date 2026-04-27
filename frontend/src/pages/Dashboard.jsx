import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <h1>Welcome 👋</h1>
            <h2>{user?.name}</h2>

            <button onClick={handleLogout} style={styles.button}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
    },
    button: {
        marginTop: "20px",
        padding: "10px 20px",
        background: "red",
        border: "none",
        color: "white",
        borderRadius: "5px",
        cursor: "pointer",
    },
};