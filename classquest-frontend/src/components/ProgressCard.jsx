function ProgressCard({ attended, total }) {
    const percentage = total === 0 ? 0 : Math.round((attended / total) * 100);

    return (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        Weekly Progress
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                        {attended} / {total} classes
                    </h2>
                </div>

                <p className="text-3xl font-bold text-indigo-600">
                    {percentage}%
                </p>
            </div>

            <div className="mt-5 h-3 rounded-full bg-slate-100">
                <div
                    className="h-3 rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default ProgressCard;