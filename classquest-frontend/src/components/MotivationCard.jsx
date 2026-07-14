import { Sparkles } from "lucide-react";

function MotivationCard({
                            currentStreak,
                            attendedThisWeek,
                            totalClassesThisWeek,
                            totalPoints,
                        }) {
    function getMessage() {
        if (totalClassesThisWeek === 0) {
            return "Import your timetable and begin building your attendance journey.";
        }

        if (
            attendedThisWeek === totalClassesThisWeek &&
            totalClassesThisWeek > 0
        ) {
            return "Perfect week so far! You have attended every scheduled class.";
        }

        if (currentStreak >= 5) {
            return `Amazing work — you are currently on a ${currentStreak}-class streak!`;
        }

        if (currentStreak > 0) {
            return `You are on a ${currentStreak}-class streak. Keep the momentum going!`;
        }

        const remaining = totalClassesThisWeek - attendedThisWeek;

        if (remaining === 1) {
            return "Only one class remains this week. Finish strongly!";
        }

        if (totalPoints >= 100) {
            return "You have earned more than 100 XP. Keep progressing towards your next achievement.";
        }

        return "Every class attended moves you closer to your weekly goal.";
    }

    return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white p-3 text-blue-600 shadow-sm">
                    <Sparkles className="h-6 w-6" />
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                        Your motivation
                    </p>

                    <p className="mt-2 text-lg font-semibold text-slate-900">
                        {getMessage()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MotivationCard;