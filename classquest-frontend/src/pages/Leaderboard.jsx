import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";
import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadLeaderboard() {
            const data = await getLeaderboard();
            setLeaderboard(data);
        }

        loadLeaderboard();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Weekly Leaderboard
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Ranked by weekly attendance percentage.
                        </p>
                    </div>

                    <button onClick={() => navigate("/dashboard")} className="rounded-xl bg-indigo-600 px-4 py-2 text-white">
                        Dashboard
                    </button>
                </div>

                <div className="space-y-4">
                    {leaderboard.map((student, index) => (
                        <div key={student.studentId} className="rounded-2xl bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Trophy className="h-6 w-6 text-yellow-500" />
                                    <div>
                                        <p className="text-lg font-bold text-slate-900">
                                            #{index + 1} {student.firstName}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {student.attendedThisWeek} / {student.totalClassesThisWeek} classes this week
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold text-indigo-600">
                                        {student.weeklyAttendancePercentage.toFixed(1)}%
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        🔥 {student.currentStreak} streak
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;