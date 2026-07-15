import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "../components/Auth.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setMessage("");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            setMessage("Please enter your email and password.");
            return;
        }

        try {
            setIsLoading(true);
            setMessage("");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/students/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email.trim(),
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Email or password is incorrect.");
            }

            localStorage.setItem("studentId", data.studentId);
            localStorage.setItem("firstName", data.firstName);

            navigate("/dashboard");
        } catch (error) {
            setMessage(error.message || "Unable to log in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            description="Sign in to continue your attendance journey."
        >
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@newcastle.ac.uk"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                </div>

                <div className="form-group">
                    <div className="password-label-row">
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="password-input-wrapper">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword((previous) => !previous)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                {message && <p className="form-message error-message">{message}</p>}

                <button
                    type="submit"
                    className="primary-auth-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign in"}
                </button>

                <p className="auth-switch-text">
                    New to ClassQuest? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </AuthLayout>
    );
}

export default Login;