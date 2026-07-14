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
            return "Perfect week so far. You have attended every scheduled class.";
        }

        if (currentStreak >= 5) {
            return `Great work. You are currently on a ${currentStreak}-class streak.`;
        }

        if (currentStreak > 0) {
            return `You are on a ${currentStreak}-class streak. Keep the momentum going.`;
        }

        const remaining = totalClassesThisWeek - attendedThisWeek;

        if (remaining === 1) {
            return "Only one class remains this week. Finish strongly.";
        }

        if (totalPoints >= 100) {
            return "You have earned more than 100 XP. Keep progressing towards your next achievement.";
        }

        return "Every class attended moves you closer to your weekly goal.";
    }

    return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/45 to-indigo-950/30 p-6 shadow-xl shadow-black/10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                Your progress
            </p>

            <p className="mt-3 max-w-4xl text-lg font-semibold leading-7 text-slate-100">
                {getMessage()}
            </p>
        </div>
    );
}

export default MotivationCard;