import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { importTimetable } from "../services/timetableImportService";

function ImportTimetable() {
    const [timetableLink, setTimetableLink] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleImport(e) {
        e.preventDefault();

        const studentId = localStorage.getItem("studentId");

        if (!studentId) {
            navigate("/");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            await importTimetable(studentId, timetableLink);

            setMessage("Timetable imported successfully!");
        } catch {
            setMessage("Failed to import timetable. Please check your link.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <form
                onSubmit={handleImport}
                className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg"
            >
                <h1 className="text-3xl font-bold text-slate-900">
                    Import Timetable
                </h1>

                <p className="mt-2 text-slate-500">
                    Paste your university webcal or timetable link.
                </p>

                <input
                    type="text"
                    placeholder="webcal://..."
                    className="mt-6 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-600"
                    value={timetableLink}
                    onChange={(e) => setTimetableLink(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full rounded-xl bg-indigo-600 p-3 font-medium text-white hover:bg-indigo-700"
                >
                    {loading ? "Importing..." : "Import Timetable"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="mt-3 w-full rounded-xl border border-slate-300 p-3 font-medium text-slate-700 hover:bg-slate-50"
                >
                    Back to Dashboard
                </button>

                {message && (
                    <p className="mt-4 text-sm text-slate-700">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default ImportTimetable;