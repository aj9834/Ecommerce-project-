const BASE_URL = "http://localhost:8080";

// ✅ REGISTER API
export const registerUser = async (formData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Registration failed");
    }

    return await response.json();
};


// ✅ LOGIN API
export const loginUser = async (formData) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Login failed");
    }

    return await response.json();
};


// ✅ PROTECTED API (WITH TOKEN)
export const getProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    return await response.json();
};
