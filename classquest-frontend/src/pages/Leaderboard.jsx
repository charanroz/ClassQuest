import { useEffect, useState } from "react";
import { Flame, Medal } from "lucide-react";
import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentStudentId = Number(localStorage.getItem("studentId"));

    useEffect(() => {
        async function loadLeaderboard() {
            try {
                const data = await getLeaderboard();
                setStudents(data);
            } catch {
                setError("Failed to load leaderboard.");
            } finally {
                setLoading(false);
            }
        }

        loadLeaderboard();
    }, []);

    function getRankStyle(index) {
        if (index === 0) {
            return {
                icon: "text-amber-400",
                background: "bg-amber-500/10",
            };
        }

        if (index === 1) {
            return {
                icon: "text-slate-300",
                background: "bg-slate-400/10",
            };
        }

        if (index === 2) {
            return {
                icon: "text-orange-400",
                background: "bg-orange-500/10",
            };
        }

        return {
            icon: "text-violet-400",
            background: "bg-violet-500/10",
        };
    }

    if (loading) {
        return <p className="text-slate-400">Loading leaderboard...</p>;
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                    Weekly ranking
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">
                    Leaderboard
                </h1>

                <p className="mt-2 text-slate-400">
                    Rankings are based on weekly attendance percentage.
                </p>
            </div>

            {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-950/25 p-4 text-red-300">
                    {error}
                </div>
            )}

            {students.length === 0 ? (
                <div className="rounded-2xl border border-[#262d43] bg-[#111625] p-8 text-center text-slate-400">
                    No leaderboard data available yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {students.map((student, index) => {
                        const rankStyle = getRankStyle(index);

                        const isCurrentStudent =
                            student.studentId === currentStudentId;

                        return (
                            <div
                                key={student.studentId}
                                className={`rounded-2xl border p-5 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 ${
                                    isCurrentStudent
                                        ? "border-violet-500/40 bg-violet-500/10"
                                        : "border-[#262d43] bg-[#111625]"
                                }`}
                            >
                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${rankStyle.background}`}
                                        >
                                            {index < 3 ? (
                                                <Medal
                                                    className={`h-7 w-7 ${rankStyle.icon}`}
                                                />
                                            ) : (
                                                <span className="font-bold text-violet-400">
                                                    {index + 1}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-lg font-bold text-white">
                                                    {student.firstName}
                                                </h2>

                                                {isCurrentStudent && (
                                                    <span className="rounded-full bg-violet-600 px-2.5 py-1 text-xs font-semibold text-white">
                                                        You
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {student.attendedThisWeek} /{" "}
                                                {student.totalClassesThisWeek}{" "}
                                                classes attended
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-8 sm:justify-end">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
                                                Streak
                                            </p>

                                            <p className="mt-1 flex items-center gap-1 font-semibold text-orange-400">
                                                <Flame className="h-4 w-4" />
                                                {student.currentStreak}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
                                                Attendance
                                            </p>

                                            <p className="mt-1 text-2xl font-bold text-violet-400">
                                                {Number(
                                                    student.weeklyAttendancePercentage
                                                ).toFixed(1)}
                                                %
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Leaderboard;