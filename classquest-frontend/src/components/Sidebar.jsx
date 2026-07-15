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

    const attendanceItems = [
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
    ];

    const progressItems = [
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
    ];

    function handleLogout() {
        localStorage.removeItem("studentId");
        localStorage.removeItem("firstName");
        localStorage.removeItem("studentName");

        navigate("/");
    }

    function renderLink(item) {
        const Icon = item.icon;

        return (
            <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                        isActive
                            ? "bg-indigo-600 text-white shadow-lg shadow-violet-950/30"
                            : "text-slate-400 hover:bg-[#1a1f32] hover:text-slate-100"
                    }`
                }
            >
                <Icon className="h-5 w-5" />
                {item.name}
            </NavLink>
        );
    }

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar overlay"
                    onClick={onClose}
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-[#242a40] bg-[#0d1120] transition-transform duration-300 lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-20 items-center justify-between border-b border-[#242a40] px-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-950/30">
                            <GraduationCap className="h-6 w-6" />
                        </div>

                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-white">
                                ClassQuest
                            </h1>

                            <p className="mt-0.5 text-xs font-medium text-slate-500">
                                Attendance made rewarding
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Close sidebar"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-[#1a1f32] hover:text-white lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {renderLink({
                            name: "Dashboard",
                            path: "/dashboard",
                            icon: LayoutDashboard,
                        })}
                    </div>

                    <p className="mb-2 mt-7 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                        Attendance
                    </p>

                    <div className="space-y-2">
                        {attendanceItems.map(renderLink)}
                    </div>

                    <p className="mb-2 mt-7 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                        Progress
                    </p>

                    <div className="space-y-2">
                        {progressItems.map(renderLink)}
                    </div>

                    <div className="mt-7 space-y-2">
                        {renderLink({
                            name: "Import Timetable",
                            path: "/import",
                            icon: Upload,
                        })}
                    </div>
                </nav>

                <div className="border-t border-[#242a40] p-4">
                    <div className="mb-3 rounded-2xl border border-[#242a40] bg-[#151a2b] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                            Signed in as
                        </p>

                        <p className="mt-2 font-semibold text-slate-200">
                            {localStorage.getItem("firstName") || "Student"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
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