import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import { getWeekClasses } from "../services/weekService";

function WeeklyTimetable() {
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadWeek() {
            const studentId = localStorage.getItem("studentId");

            if (!studentId) {
                navigate("/");
                return;
            }

            try {
                const data = await getWeekClasses(studentId);
                setClasses(data);
            } catch {
                setError("Failed to load your weekly timetable.");
            } finally {
                setLoading(false);
            }
        }

        loadWeek();
    }, [navigate]);

    if (loading) {
        return <p className="text-slate-400">Loading timetable...</p>;
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                    Timetable
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">
                    Weekly Timetable
                </h1>

                <p className="mt-2 text-slate-400">
                    Your imported classes for this week.
                </p>
            </div>

            {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-950/25 p-4 text-red-300">
                    {error}
                </div>
            )}

            {classes.length === 0 ? (
                <div className="rounded-2xl border border-[#262d43] bg-[#111625] p-8 text-slate-400">
                    No classes found for this week.
                </div>
            ) : (
                <div className="space-y-4">
                    {classes.map((classSession) => (
                        <div
                            key={classSession.id}
                            className="rounded-2xl border border-[#262d43] bg-[#111625] p-5 shadow-xl shadow-black/10 transition hover:border-violet-500/30"
                        >
                            <p className="text-sm font-semibold text-violet-400">
                                {new Date(
                                    classSession.startTime
                                ).toLocaleDateString([], {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </p>

                            <h2 className="mt-3 text-xl font-bold text-white">
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

                                    <span className="text-slate-600">—</span>

                                    {new Date(
                                        classSession.endTime
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

                            <span className="mt-4 inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
                                {classSession.sessionType}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeeklyTimetable;