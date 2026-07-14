import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { importTimetable } from "../services/timetableImportService";

function ImportTimetable() {
    const [timetableLink, setTimetableLink] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleImport(event) {
        event.preventDefault();

        const studentId = localStorage.getItem("studentId");

        if (!studentId) {
            navigate("/");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            await importTimetable(studentId, timetableLink);

            setMessageType("success");
            setMessage("Timetable imported successfully.");
        } catch {
            setMessageType("error");
            setMessage(
                "Failed to import timetable. Please check your link."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                    Timetable
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">
                    Import Timetable
                </h1>

                <p className="mt-2 text-slate-400">
                    Paste your university webcal or timetable link.
                </p>
            </div>

            <form
                onSubmit={handleImport}
                className="rounded-2xl border border-[#262d43] bg-[#111625] p-6 shadow-xl shadow-black/10 sm:p-8"
            >
                <label
                    htmlFor="timetableLink"
                    className="text-sm font-medium text-slate-300"
                >
                    Timetable link
                </label>

                <input
                    id="timetableLink"
                    type="text"
                    placeholder="webcal://..."
                    className="mt-3 w-full rounded-xl border border-[#303750] bg-[#171c2d] p-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    value={timetableLink}
                    onChange={(event) =>
                        setTimetableLink(event.target.value)
                    }
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 w-full rounded-xl bg-violet-600 p-3 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Importing..." : "Import Timetable"}
                </button>

                {message && (
                    <p
                        className={`mt-4 rounded-xl border p-3 text-sm ${
                            messageType === "success"
                                ? "border-emerald-500/20 bg-emerald-950/25 text-emerald-300"
                                : "border-red-500/20 bg-red-950/25 text-red-300"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default ImportTimetable;