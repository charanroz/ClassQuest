import { CheckCircle2, Target } from "lucide-react";

function ProgressCard({ attended, total }) {
    const percentage =
        total === 0 ? 0 : Math.round((attended / total) * 100);

    function getProgressStyle() {
        if (percentage >= 80) {
            return {
                bar: "bg-emerald-500",
                text: "text-emerald-600",
                background: "bg-emerald-50",
            };
        }

        if (percentage >= 50) {
            return {
                bar: "bg-amber-500",
                text: "text-amber-600",
                background: "bg-amber-50",
            };
        }

        return {
            bar: "bg-rose-500",
            text: "text-rose-600",
            background: "bg-rose-50",
        };
    }

    const progressStyle = getProgressStyle();
    const remaining = Math.max(total - attended, 0);

    return (
        <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                        Weekly attendance
                    </p>

                    <h2 className="mt-3 text-2xl font-bold text-slate-900">
                        {attended} of {total} classes
                    </h2>
                </div>

                <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${progressStyle.background}`}
                >
                    <span
                        className={`text-xl font-bold ${progressStyle.text}`}
                    >
                        {percentage}%
                    </span>
                </div>
            </div>

            <div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full transition-all duration-700 ${progressStyle.bar}`}
                    style={{
                        width: `${Math.min(percentage, 100)}%`,
                    }}
                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-medium">
                            Attended
                        </span>
                    </div>

                    <p className="mt-2 text-2xl font-bold text-emerald-800">
                        {attended}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-600">
                        <Target className="h-5 w-5" />
                        <span className="text-sm font-medium">
                            Remaining
                        </span>
                    </div>

                    <p className="mt-2 text-2xl font-bold text-slate-800">
                        {remaining}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProgressCard;