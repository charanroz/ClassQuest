function ProgressCard({ attended, total }) {
    const percentage =
        total === 0 ? 0 : Math.round((attended / total) * 100);

    const remaining = Math.max(total - attended, 0);
    const completed = total > 0 && attended >= total;

    return (
        <div className="h-full rounded-2xl border border-[#262d43] bg-[#111625] p-6 shadow-xl shadow-black/10">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Weekly attendance
                    </p>

                    <h2 className="mt-3 text-2xl font-bold text-white">
                        {attended} of {total} classes
                    </h2>
                </div>

                <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                        completed
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-violet-500/10 text-violet-400"
                    }`}
                >
                    <span className="text-xl font-bold">
                        {percentage}%
                    </span>
                </div>
            </div>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#242a3e]">
                <div
                    className={`h-full rounded-full transition-all duration-700 ${
                        completed ? "bg-emerald-500" : "bg-violet-500"
                    }`}
                    style={{
                        width: `${Math.min(percentage, 100)}%`,
                    }}
                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
                    <p className="text-sm font-medium text-emerald-400">
                        Attended
                    </p>

                    <p className="mt-2 text-2xl font-bold text-emerald-300">
                        {attended}
                    </p>
                </div>

                <div className="rounded-xl border border-[#2a3148] bg-[#171c2d] p-4">
                    <p className="text-sm font-medium text-slate-400">
                        Remaining
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-200">
                        {remaining}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProgressCard;