import { BookOpen, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NextClassCard({ title, time, location }) {
    const navigate = useNavigate();

    const classDate = time ? new Date(time) : null;

    const formattedDate = classDate
        ? classDate.toLocaleDateString([], {
            weekday: "long",
            day: "numeric",
            month: "short",
        })
        : null;

    const formattedTime = classDate
        ? classDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;

    function getCountdown() {
        if (!classDate) {
            return null;
        }

        const difference = classDate.getTime() - Date.now();

        if (difference <= 0) {
            return "Class has started";
        }

        const totalMinutes = Math.floor(difference / 60000);
        const days = Math.floor(totalMinutes / 1440);
        const hours = Math.floor((totalMinutes % 1440) / 60);
        const minutes = totalMinutes % 60;

        if (days > 0) {
            return `Starts in ${days} day${days !== 1 ? "s" : ""}`;
        }

        if (hours > 0) {
            return `Starts in ${hours}h ${minutes}m`;
        }

        return `Starts in ${minutes} minutes`;
    }

    if (!title || !time) {
        return (
            <div className="h-full rounded-2xl border border-[#262d43] bg-[#111625] p-6 shadow-xl shadow-black/10">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Next class
                </p>

                <div className="mt-8 flex flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                        <BookOpen className="h-7 w-7" />
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-white">
                        No upcoming classes
                    </h2>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                        Import your timetable to see your next class and start
                        tracking attendance.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/import")}
                        className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white transition hover:bg-violet-500"
                    >
                        Import timetable
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-hidden rounded-2xl border border-[#262d43] bg-[#111625] shadow-xl shadow-black/10">
            <div className="border-b border-violet-400/20 bg-gradient-to-r from-violet-700 to-indigo-700 p-6">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-wide text-violet-100">
                        Next class
                    </p>

                    <span className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        {getCountdown()}
                    </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
                    {title}
                </h2>
            </div>

            <div className="p-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-400">
                        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
                            <Clock className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-200">
                                {formattedDate}
                            </p>
                            <p className="text-sm">{formattedTime}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400">
                        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
                            <MapPin className="h-5 w-5" />
                        </div>

                        <span>{location || "Location not available"}</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/today")}
                    className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
                >
                    View today’s classes
                </button>
            </div>
        </div>
    );
}

export default NextClassCard;