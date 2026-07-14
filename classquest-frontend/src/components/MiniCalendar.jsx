import { CalendarDays } from "lucide-react";

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
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <CalendarDays className="h-6 w-6" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        This week
                    </h2>

                    <p className="text-sm text-slate-500">
                        Your classes at a glance
                    </p>
                </div>
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
                                    ? "border-indigo-300 bg-indigo-50"
                                    : "border-slate-200 bg-slate-50"
                            }`}
                        >
                            <p
                                className={`text-xs font-semibold uppercase ${
                                    todayDate
                                        ? "text-indigo-600"
                                        : "text-slate-400"
                                }`}
                            >
                                {date.toLocaleDateString([], {
                                    weekday: "short",
                                })}
                            </p>

                            <p className="mt-1 text-xl font-bold text-slate-900">
                                {date.getDate()}
                            </p>

                            <div className="mt-3 space-y-2">
                                {dayClasses.slice(0, 2).map((classSession) => (
                                    <div
                                        key={classSession.id}
                                        className="rounded-lg bg-white p-2 shadow-sm"
                                    >
                                        <p className="truncate text-xs font-semibold text-slate-700">
                                            {classSession.title}
                                        </p>

                                        <p className="mt-1 text-xs text-indigo-600">
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
                                    <p className="text-xs font-medium text-slate-500">
                                        +{dayClasses.length - 2} more
                                    </p>
                                )}

                                {dayClasses.length === 0 && (
                                    <p className="text-xs text-slate-400">
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