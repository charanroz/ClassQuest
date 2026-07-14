function MiniCalendar({ classes = [] }) {
    const today = new Date();

    const startOfWeek = new Date(today);
    const currentDay = today.getDay();
    const differenceToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    startOfWeek.setDate(today.getDate() + differenceToMonday);

    const weekDays = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + index);
        return date;
    });

    function getClassesForDay(date) {
        return classes.filter((classSession) => {
            const classDate = new Date(classSession.startTime);

            return (
                classDate.getFullYear() === date.getFullYear() &&
                classDate.getMonth() === date.getMonth() &&
                classDate.getDate() === date.getDate()
            );
        });
    }

    function isToday(date) {
        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    }

    return (
        <div className="mt-6 rounded-2xl border border-[#262d43] bg-[#111625] p-6 shadow-xl shadow-black/10">
            <div>
                <h2 className="text-lg font-bold text-white">
                    This week
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Your classes at a glance
                </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {weekDays.map((date) => {
                    const dayClasses = getClassesForDay(date);
                    const todayDate = isToday(date);

                    return (
                        <div
                            key={date.toISOString()}
                            className={`min-h-32 rounded-xl border p-3 ${
                                todayDate
                                    ? "border-violet-500/50 bg-violet-500/10"
                                    : "border-[#293047] bg-[#171c2d]"
                            }`}
                        >
                            <p
                                className={`text-xs font-semibold uppercase ${
                                    todayDate
                                        ? "text-violet-400"
                                        : "text-slate-500"
                                }`}
                            >
                                {date.toLocaleDateString([], {
                                    weekday: "short",
                                })}
                            </p>

                            <p className="mt-1 text-xl font-bold text-white">
                                {date.getDate()}
                            </p>

                            <div className="mt-3 space-y-2">
                                {dayClasses.slice(0, 2).map((classSession) => (
                                    <div
                                        key={classSession.id}
                                        className="rounded-lg border border-[#303750] bg-[#0f1423] p-2"
                                    >
                                        <p className="truncate text-xs font-semibold text-slate-200">
                                            {classSession.title}
                                        </p>

                                        <p className="mt-1 text-xs text-violet-400">
                                            {new Date(
                                                classSession.startTime
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                ))}

                                {dayClasses.length > 2 && (
                                    <p className="text-xs font-medium text-slate-400">
                                        +{dayClasses.length - 2} more
                                    </p>
                                )}

                                {dayClasses.length === 0 && (
                                    <p className="text-xs text-slate-600">
                                        No classes
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MiniCalendar;