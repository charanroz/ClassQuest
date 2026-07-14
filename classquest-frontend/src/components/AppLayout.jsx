import { useState } from "react";
import { Menu } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-[#090b16] text-slate-100">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-72">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#242a40] bg-[#0d1120]/90 px-4 backdrop-blur-xl lg:px-8">
                    <button
                        type="button"
                        aria-label="Open sidebar"
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-[#191e31] hover:text-white lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="ml-auto">
                        <p className="text-sm text-slate-400">
                            Welcome,{" "}
                            <span className="font-semibold text-slate-100">
                                {localStorage.getItem("firstName") || "Student"}
                            </span>
                        </p>
                    </div>
                </header>

                <main className="min-h-[calc(100vh-4rem)] p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;