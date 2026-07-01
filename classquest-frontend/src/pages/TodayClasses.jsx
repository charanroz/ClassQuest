import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, BookOpen } from "lucide-react";
import { getTodayClasses } from "../services/classSessionService";
import { markAttendance } from "../services/attendanceService";

function TodayClasses() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

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
            setMessage("Attendance marked successfully. +10 XP!");
        } catch {
            setMessage("You can only mark present within 15 minutes of class start.");
        }
    }

    if (loading) {
        return <p className="p-6 text-slate-600">Loading today's classes...</p>;
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Today's Classes
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Mark your attendance and keep your streak going.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                    >
                        Dashboard
                    </button>
                </div>

                {message && (
                    <div className="mb-4 rounded-xl bg-indigo-50 p-4 text-indigo-700">
                        {message}
                    </div>
                )}

                {classes.length === 0 ? (
                    <div className="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">
                        No classes scheduled for today.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {classes.map((classSession) => (
                            <div
                                key={classSession.id}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-indigo-600">
                                            <BookOpen className="h-5 w-5" />
                                            <p className="font-medium">
                                                {classSession.sessionType}
                                            </p>
                                        </div>

                                        <h2 className="mt-2 text-xl font-bold text-slate-900">
                                            {classSession.title}
                                        </h2>

                                        <div className="mt-3 space-y-2 text-slate-600">
                                            <p className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                {new Date(classSession.startTime).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                {classSession.location || "Location not available"}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleMarkPresent(classSession.id)}
                                        className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
                                    >
                                        Mark Present
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodayClasses;