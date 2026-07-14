function StatCard({ title, value, icon, tone = "violet", subtitle }) {
    const styles = {
        orange: {
            icon: "bg-orange-500/10 text-orange-400",
            border: "hover:border-orange-500/30",
        },
        amber: {
            icon: "bg-violet-500/10 text-violet-400",
            border: "hover:border-violet-500/30",
        },
        blue: {
            icon: "bg-blue-500/10 text-blue-400",
            border: "hover:border-blue-500/30",
        },
        violet: {
            icon: "bg-violet-500/10 text-violet-400",
            border: "hover:border-violet-500/30",
        },
    };

    const selectedStyle = styles[tone] || styles.violet;

    return (
        <div
            className={`rounded-2xl border border-[#262d43] bg-[#111625] p-6 shadow-xl shadow-black/10 transition duration-200 hover:-translate-y-1 hover:bg-[#141a2b] ${selectedStyle.border}`}
        >
            <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${selectedStyle.icon}`}
            >
                {icon}
            </div>

            <p className="mt-5 text-sm font-medium text-slate-400">
                {title}
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                {value}
            </p>

            {subtitle && (
                <p className="mt-2 text-sm text-slate-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default StatCard;