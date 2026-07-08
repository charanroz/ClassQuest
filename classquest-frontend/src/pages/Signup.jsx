import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/students", {
                firstName,
                lastName,
                email,
                password,
            });

            localStorage.setItem("studentId", response.data.id);
            localStorage.setItem("firstName", response.data.firstName);

            navigate("/dashboard");
        } catch {
            setError("Signup failed. Email may already exist.");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <form onSubmit={handleSignup} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-slate-900">🎓 ClassQuest</h1>
                <p className="mt-2 text-slate-500">Create your account and start tracking attendance.</p>

                <input className="mt-6 w-full rounded-xl border p-3" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input className="mt-4 w-full rounded-xl border p-3" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input type="email" className="mt-4 w-full rounded-xl border p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className="mt-4 w-full rounded-xl border p-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button className="mt-4 w-full rounded-xl bg-indigo-600 p-3 font-medium text-white">
                    Sign Up
                </button>

                <button type="button" onClick={() => navigate("/")} className="mt-3 w-full text-sm text-indigo-600">
                    Already have an account? Login
                </button>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </form>
        </div>
    );
}

export default Signup;