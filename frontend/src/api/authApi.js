// Base URL of your Spring Boot backend
const BASE_URL = "http://localhost:8080";

export const registerUser = async (formData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
        // Return validation errors or conflict errors from backend
        throw data;
    }

    return data;
};