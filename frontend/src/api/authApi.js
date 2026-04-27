const BASE_URL = "http://localhost:8080";

export const registerUser = async (formData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    // 👇 IMPORTANT: check before parsing JSON
    if (!response.ok) {
        const text = await response.text();
        throw { error: text || "Registration failed" };
    }

    return await response.json();
};