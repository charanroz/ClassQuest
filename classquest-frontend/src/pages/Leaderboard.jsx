import { useEffect, useState } from "react";
import {
    Flame,
    Medal,
    Trophy,
} from "lucide-react";

import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentStudentId = Number(
        localStorage.getItem("studentId")
    );

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
                icon: "text-amber-500",
                background: "bg-amber-50",
                label: "1st",
            };
        }

        if (index === 1) {
            return {
                icon: "text-slate-500",
                background: "bg-slate-100",
                label: "2nd",
            };
        }

        if (index === 2) {
            return {
                icon: "text-orange-600",
                background: "bg-orange-50",
                label: "3rd",
            };
        }

        return {
            icon: "text-indigo-500",
            background: "bg-indigo-50",
            label: `${index + 1}th`,
        };
    }

    if (loading) {
        return <p className="text-slate-500">Loading leaderboard...</p>;
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    Weekly ranking
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    Leaderboard
                </h1>

                <p className="mt-2 text-slate-500">
                    Rankings are based on weekly attendance percentage.
                </p>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            {students.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <Trophy className="mx-auto h-10 w-10 text-slate-300" />
                    <p className="mt-4 text-slate-500">
                        No leaderboard data available yet.
                    </p>
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
                                className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                                    isCurrentStudent
                                        ? "border-indigo-300 bg-indigo-50"
                                        : "border-slate-200 bg-white"
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
                                                <span className="font-bold text-indigo-600">
                                                    {index + 1}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-lg font-bold text-slate-900">
                                                    {student.firstName}
                                                </h2>

                                                {isCurrentStudent && (
                                                    <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white">
                                                        You
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {
                                                    student.attendedThisWeek
                                                }{" "}
                                                /{" "}
                                                {
                                                    student.totalClassesThisWeek
                                                }{" "}
                                                classes attended
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-8 sm:justify-end">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                Streak
                                            </p>

                                            <p className="mt-1 flex items-center gap-1 font-semibold text-orange-600">
                                                <Flame className="h-4 w-4" />
                                                {student.currentStreak}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                Attendance
                                            </p>

                                            <p className="mt-1 text-2xl font-bold text-indigo-600">
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