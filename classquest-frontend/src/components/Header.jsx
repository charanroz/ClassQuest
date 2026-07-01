function Header({ firstName }) {
    return (
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    🎓 ClassQuest
                </h1>

                <p className="mt-2 text-slate-500">
                    Build your attendance streak, one class at a time.
                </p>
            </div>

            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                {firstName || "Student"} 👋
            </div>
        </div>
    );
}

export default Header;