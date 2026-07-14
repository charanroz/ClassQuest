import { useEffect, useState } from "react";
import {
    Award,
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

                if (!studentId) {
                    setError("Student account not found.");
                    return;
                }

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
        return (
            <p className="text-slate-400">
                Loading achievements...
            </p>
        );
    }

    const progressPercentage =
        badgeCatalogue.length === 0
            ? 0
            : (earnedBadges.length / badgeCatalogue.length) * 100;

    return (
        <div className="mx-auto max-w-6xl">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                    Achievements
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">
                    Your badges
                </h1>

                <p className="mt-2 text-slate-400">
                    Complete attendance goals to unlock new achievements.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-500/20 bg-red-950/25 p-4 text-red-300">
                    {error}
                </div>
            )}

            <div className="mb-6 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-700 to-indigo-700 p-6 text-white shadow-xl shadow-violet-950/20">
                <p className="text-sm font-medium text-violet-100">
                    Achievement progress
                </p>

                <p className="mt-2 text-3xl font-bold">
                    {earnedBadges.length} / {badgeCatalogue.length}
                </p>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-black/20">
                    <div
                        className="h-full rounded-full bg-white transition-all duration-500"
                        style={{
                            width: `${progressPercentage}%`,
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
                            className={`relative overflow-hidden rounded-2xl border p-6 transition duration-200 hover:-translate-y-1 ${
                                earned
                                    ? "border-violet-500/30 bg-[#141a2b] shadow-xl shadow-black/10"
                                    : "border-[#262d43] bg-[#101522]"
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                                        earned
                                            ? "bg-violet-500/10 text-violet-400"
                                            : "bg-[#202638] text-slate-600"
                                    }`}
                                >
                                    <Icon className="h-7 w-7" />
                                </div>

                                <span
                                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                        earned
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-[#202638] text-slate-500"
                                    }`}
                                >
                                    {!earned && (
                                        <Lock className="h-3.5 w-3.5" />
                                    )}

                                    {earned ? "Earned" : "Locked"}
                                </span>
                            </div>

                            <h2
                                className={`mt-5 text-xl font-bold ${
                                    earned
                                        ? "text-white"
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