import { useEffect, useState } from "react";
import {
    Award,
    CheckCircle2,
    Flame,
    Lock,
    Medal,
    Star,
    Trophy,
} from "lucide-react";

import { getBadges } from "../services/badgeService";

const badgeCatalogue = [
    {
        name: "First Attendance",
        description: "Attend your first class.",
        icon: Award,
    },
    {
        name: "5 Class Streak",
        description: "Attend five consecutive classes.",
        icon: Flame,
    },
    {
        name: "100 XP",
        description: "Earn a total of 100 XP.",
        icon: Star,
    },
    {
        name: "Perfect Week",
        description: "Attend every scheduled class in one week.",
        icon: Trophy,
    },
    {
        name: "Attendance Champion",
        description: "Maintain an attendance rate above 90%.",
        icon: Medal,
    },
];

function Badges() {
    const [earnedBadges, setEarnedBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadBadges() {
            try {
                const studentId = localStorage.getItem("studentId");
                const data = await getBadges(studentId);
                setEarnedBadges(data);
            } catch {
                setError("Failed to load badges.");
            } finally {
                setLoading(false);
            }
        }

        loadBadges();
    }, []);

    function findEarnedBadge(name) {
        return earnedBadges.find((badge) => badge.name === name);
    }

    if (loading) {
        return <p className="text-slate-500">Loading achievements...</p>;
    }

    return (
        <div className="mx-auto max-w-6xl">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    Achievements
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    Your badges
                </h1>

                <p className="mt-2 text-slate-500">
                    Complete attendance goals to unlock new achievements.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
                <p className="text-sm font-medium text-indigo-100">
                    Achievement progress
                </p>

                <p className="mt-2 text-3xl font-bold">
                    {earnedBadges.length} / {badgeCatalogue.length}
                </p>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">
                    <div
                        className="h-full rounded-full bg-white transition-all"
                        style={{
                            width: `${
                                (earnedBadges.length /
                                    badgeCatalogue.length) *
                                100
                            }%`,
                        }}
                    />
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {badgeCatalogue.map((badge) => {
                    const earnedBadge = findEarnedBadge(badge.name);
                    const Icon = badge.icon;
                    const earned = Boolean(earnedBadge);

                    return (
                        <div
                            key={badge.name}
                            className={`relative overflow-hidden rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-md ${
                                earned
                                    ? "border-amber-200 bg-white"
                                    : "border-slate-200 bg-slate-50"
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                                        earned
                                            ? "bg-amber-100 text-amber-600"
                                            : "bg-slate-200 text-slate-400"
                                    }`}
                                >
                                    <Icon className="h-7 w-7" />
                                </div>

                                {earned ? (
                                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Earned
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                                        <Lock className="h-4 w-4" />
                                        Locked
                                    </span>
                                )}
                            </div>

                            <h2
                                className={`mt-5 text-xl font-bold ${
                                    earned
                                        ? "text-slate-900"
                                        : "text-slate-500"
                                }`}
                            >
                                {badge.name}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {earnedBadge?.description ||
                                    badge.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Badges;