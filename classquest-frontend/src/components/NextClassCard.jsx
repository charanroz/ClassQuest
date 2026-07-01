import { BookOpen, Clock, MapPin } from "lucide-react";

function NextClassCard({ title, time, location }) {
    const formattedTime = time
        ? new Date(time).toLocaleString([], {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "No upcoming class";

    return (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Next Class</p>

            <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-xl font-semibold text-slate-900">
                        {title || "No upcoming class"}
                    </h2>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="h-5 w-5" />
                    <span>{formattedTime}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="h-5 w-5" />
                    <span>{location || "Location not available"}</span>
                </div>
            </div>

            <button className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700">
                Mark Present
            </button>
        </div>
    );
}

export default NextClassCard;