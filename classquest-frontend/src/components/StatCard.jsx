function StatCard({ title, value, icon, tone = "indigo", subtitle }) {
    const styles = {
        orange: {
            icon: "bg-amber-50 text-amber-600",
            border: "hover:border-amber-200",
        },
        amber: {
            icon: "bg-violet-50 text-violet-600",
            border: "hover:border-violet-200",
        },
        blue: {
            icon: "bg-blue-50 text-blue-600",
            border: "hover:border-blue-200",
        },
        indigo: {
            icon: "bg-slate-100 text-slate-700",
            border: "hover:border-slate-300",
        },
    };

    const selectedStyle = styles[tone] || styles.indigo;

    return (
        <div
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${selectedStyle.border}`}
        >
            <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${selectedStyle.icon}`}
            >
                {icon}
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
                {title}
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {value}
            </p>

            {subtitle && (
                <p className="mt-2 text-sm text-slate-400">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default StatCard;