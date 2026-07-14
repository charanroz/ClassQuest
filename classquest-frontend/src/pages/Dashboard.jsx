import { useEffect, useState } from "react";
import {
    CalendarCheck,
    Flame,
    Star,
} from "lucide-react";

import { getDashboard } from "../services/dashboardService";
import { getWeekClasses } from "../services/weekService";

import StatCard from "../components/StatCard";
import NextClassCard from "../components/NextClassCard";
import ProgressCard from "../components/ProgressCard";
import MotivationCard from "../components/MotivationCard";
import MiniCalendar from "../components/MiniCalendar";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [weekClasses, setWeekClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                const studentId = localStorage.getItem("studentId");

                const [dashboardData, weekData] = await Promise.all([
                    getDashboard(studentId),
                    getWeekClasses(studentId),
                ]);

                setDashboard(dashboardData);
                setWeekClasses(weekData);
            } catch {
                setError("Failed to load your dashboard.");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl">
                <div className="animate-pulse space-y-6">
                    <div className="h-24 rounded-2xl bg-slate-200" />

                    <div className="grid gap-5 md:grid-cols-3">
                        <div className="h-44 rounded-2xl bg-slate-200" />
                        <div className="h-44 rounded-2xl bg-slate-200" />
                        <div className="h-44 rounded-2xl bg-slate-200" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-6xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                {error}
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                    Overview
                </p>

                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                    Welcome back,{" "}
                    {localStorage.getItem("firstName") || "Student"}
                </h1>

                <p className="mt-3 max-w-2xl text-slate-500">
                    Track your progress, maintain your streak and work towards
                    your weekly attendance goals.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <StatCard
                    icon={<Flame className="h-6 w-6" />}
                    title="Current streak"
                    value={`${dashboard.currentStreak} ${
                        dashboard.currentStreak === 1 ? "Class" : "Classes"
                    }`}
                    subtitle="Keep your momentum going"
                    tone="orange"
                />

                <StatCard
                    icon={<Star className="h-6 w-6" />}
                    title="Total points"
                    value={`${dashboard.totalPoints} XP`}
                    subtitle="Earn 10 XP for each attendance"
                    tone="amber"
                />

                <StatCard
                    icon={<CalendarCheck className="h-6 w-6" />}
                    title="This week"
                    value={`${dashboard.attendedThisWeek} / ${dashboard.totalClassesThisWeek}`}
                    subtitle="Classes attended this week"
                    tone="blue"
                />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_1fr]">
                <NextClassCard
                    title={dashboard.nextClassTitle}
                    time={dashboard.nextClassTime}
                    location={dashboard.nextClassLocation}
                />

                <ProgressCard
                    attended={dashboard.attendedThisWeek}
                    total={dashboard.totalClassesThisWeek}
                />
            </div>

            <MiniCalendar classes={weekClasses} />

            <MotivationCard
                currentStreak={dashboard.currentStreak}
                attendedThisWeek={dashboard.attendedThisWeek}
                totalClassesThisWeek={dashboard.totalClassesThisWeek}
                totalPoints={dashboard.totalPoints}
            />

            <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
                © 2026 ClassQuest • Developed by Charan Anandharaj
            </footer>

        </div>
    );
}

export default Dashboard;