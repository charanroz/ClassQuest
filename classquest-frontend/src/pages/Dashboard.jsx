import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, Star, CalendarCheck } from "lucide-react";

import { getDashboard } from "../services/dashboardService";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import NextClassCard from "../components/NextClassCard";
import ProgressCard from "../components/ProgressCard";
import MotivationCard from "../components/MotivationCard";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function loadDashboard() {
            try {
                const studentId = localStorage.getItem("studentId");

                if (!studentId) {
                    navigate("/");
                    return;
                }

                const data = await getDashboard(studentId);
                setDashboard(data);
            } catch (err) {
                setError("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [navigate]);

    if (loading) {
        return (
            <p className="p-6 text-slate-600">
                Loading dashboard...
            </p>
        );
    }

    if (error) {
        return (
            <p className="p-6 text-red-600">
                {error}
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-5xl">

                <Header
                    firstName={localStorage.getItem("firstName")}
                />

                <button
                    onClick={() => navigate("/today")}
                    className="mb-6 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
                >
                    View Today's Classes
                </button>


                <button
                    onClick={() => navigate("/week")}
                    className="mb-6 ml-4 rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                >
                    Weekly Timetable
                </button>

                <button
                    onClick={() => navigate("/history")}
                    className="mb-6 ml-4 rounded-xl bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
                >
                    Attendance History
                </button>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <StatCard
                        icon={<Flame />}
                        title="Current Streak"
                        value={`${dashboard.currentStreak} Days`}
                    />

                    <StatCard
                        icon={<Star />}
                        title="Total Points"
                        value={`${dashboard.totalPoints} XP`}
                    />

                    <StatCard
                        icon={<CalendarCheck />}
                        title="This Week"
                        value={`${dashboard.attendedThisWeek} / ${dashboard.totalClassesThisWeek}`}
                    />

                </div>

                <NextClassCard
                    title={dashboard.nextClassTitle}
                    time={dashboard.nextClassTime}
                    location={dashboard.nextClassLocation}
                />

                <ProgressCard
                    attended={dashboard.attendedThisWeek}
                    total={dashboard.totalClassesThisWeek}
                />

                <MotivationCard />

            </div>
        </div>
    );
}

export default Dashboard;