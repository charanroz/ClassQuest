import {
    Award,
    CalendarCheck,
    CalendarDays,
    GraduationCap,
    History,
    LayoutDashboard,
    LogOut,
    Trophy,
    Upload,
    X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const navigationItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Today's Classes",
            path: "/today",
            icon: CalendarCheck,
        },
        {
            name: "Weekly Timetable",
            path: "/week",
            icon: CalendarDays,
        },
        {
            name: "Attendance History",
            path: "/history",
            icon: History,
        },
        {
            name: "Badges",
            path: "/badges",
            icon: Award,
        },
        {
            name: "Leaderboard",
            path: "/leaderboard",
            icon: Trophy,
        },
        {
            name: "Import Timetable",
            path: "/import",
            icon: Upload,
        },
    ];

    function handleLogout() {
        localStorage.removeItem("studentId");
        localStorage.removeItem("firstName");
        navigate("/");
    }

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onClose}
                    className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                            <GraduationCap className="h-6 w-6" />
                        </div>

                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                                ClassQuest
                            </h1>

                            <p className="mt-0.5 text-xs font-medium text-slate-400">
                                Attendance made rewarding
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Close sidebar"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                    }`
                                }
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-100 p-4">
                    <div className="mb-3 rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Signed in as
                        </p>

                        <p className="mt-2 font-semibold text-slate-900">
                            {localStorage.getItem("firstName") || "Student"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;