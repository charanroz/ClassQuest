import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            localStorage.setItem(
                "studentId",
                response.data.studentId
            );

            localStorage.setItem(
                "firstName",
                response.data.firstName
            );

            navigate("/dashboard");

        } catch (err) {

            setError("Invalid email or password");

        }
    }

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
            >

                <h1 className="text-3xl font-bold text-slate-900">
                    🎓 ClassQuest
                </h1>

                <p className="mt-2 text-slate-500">
                    Login to continue your attendance journey.
                </p>


                <input
                    type="email"
                    placeholder="Enter your email"
                    className="mt-6 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />


                <input
                    type="password"
                    placeholder="Enter your password"
                    className="mt-4 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />


                <button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-indigo-600 p-3 font-medium text-white hover:bg-indigo-700"
                >
                    Login
                </button>


                <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="mt-4 w-full rounded-xl border border-indigo-600 p-3 font-medium text-indigo-600 hover:bg-indigo-50"
                >
                    Create New Account
                </button>


                {error && (
                    <p className="mt-4 text-sm text-red-600">
                        {error}
                    </p>
                )}


            </form>

        </div>

    );

}

export default Login;