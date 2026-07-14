import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "../components/Auth.css";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = formData;

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            setMessage("Please complete all fields.");
            return;
        }

        if (password.length < 8) {
            setMessage("Your password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("The passwords do not match.");
            return;
        }

        try {
            setIsLoading(true);
            setMessage("");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/students`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to create your account.");
            }

            navigate("/login", {
                state: {
                    message: "Account created successfully. You can now sign in.",
                },
            });
        } catch (error) {
            setMessage(
                error.message || "Unable to create your account. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Create your account"
            description="Start tracking your classes and building your attendance streak."
        >
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-name-row">
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Charan"
                            value={formData.firstName}
                            onChange={handleChange}
                            autoComplete="given-name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last name</label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Anandharaj"
                            value={formData.lastName}
                            onChange={handleChange}
                            autoComplete="family-name"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">University email</label>

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
                    <label htmlFor="password">Password</label>

                    <div className="password-input-wrapper">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="At least 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
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

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>

                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter the password again"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                </div>

                {message && <p className="form-message error-message">{message}</p>}

                <button
                    type="submit"
                    className="primary-auth-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating account..." : "Create account"}
                </button>

                <p className="auth-switch-text">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </AuthLayout>
    );
}

export default Signup;