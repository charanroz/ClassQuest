import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import { getTodayClasses } from "../services/classSessionService";
import { markAttendance } from "../services/attendanceService";

function TodayClasses() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    const navigate = useNavigate();

    useEffect(() => {
        async function loadClasses() {
            const studentId = localStorage.getItem("studentId");

            if (!studentId) {
                navigate("/");
                return;
            }

            try {
                const data = await getTodayClasses(studentId);
                setClasses(data);
            } catch {
                setMessageType("error");
                setMessage("Failed to load today's classes.");
            } finally {
                setLoading(false);
            }
        }

        loadClasses();
    }, [navigate]);

    async function handleMarkPresent(classSessionId) {
        const studentId = localStorage.getItem("studentId");

        try {
            await markAttendance(studentId, classSessionId, "PRESENT");
            setMessageType("success");
            setMessage("Attendance marked successfully. You earned 10 XP.");
        } catch {
            setMessageType("error");
            setMessage(
                "You can only mark present within 15 minutes of the class start."
            );
        }
    }

    if (loading) {
        return (
            <p className="mx-auto max-w-5xl text-slate-400">
                Loading today's classes...
            </p>
        );
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                    Attendance
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">
                    Today's Classes
                </h1>

                <p className="mt-2 text-slate-400">
                    Mark your attendance and keep your streak going.
                </p>
            </div>

            {message && (
                <div
                    className={`mb-5 rounded-xl border p-4 text-sm ${
                        messageType === "success"
                            ? "border-emerald-500/20 bg-emerald-950/25 text-emerald-300"
                            : "border-red-500/20 bg-red-950/25 text-red-300"
                    }`}
                >
                    {message}
                </div>
            )}

            {classes.length === 0 ? (
                <div className="rounded-2xl border border-[#262d43] bg-[#111625] p-8 text-slate-400">
                    No classes scheduled for today.
                </div>
            ) : (
                <div className="space-y-4">
                    {classes.map((classSession) => (
                        <div
                            key={classSession.id}
                            className="rounded-2xl border border-[#262d43] bg-[#111625] p-6 shadow-xl shadow-black/10 transition hover:border-violet-500/30"
                        >
                            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                                <div>
                                    <p className="text-sm font-medium text-violet-400">
                                        {classSession.sessionType}
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold text-white">
                                        {classSession.title}
                                    </h2>

                                    <div className="mt-4 space-y-3 text-sm text-slate-400">
                                        <p className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-violet-400" />

                                            {new Date(
                                                classSession.startTime
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-violet-400" />

                                            {classSession.location ||
                                                "Location not available"}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleMarkPresent(classSession.id)
                                    }
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-500"
                                >
                                    Mark Present
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TodayClasses;