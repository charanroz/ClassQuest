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
        <div className="min-h-screen bg-slate-50">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-72">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-8">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="ml-auto">
                        <p className="text-sm font-medium text-slate-700">
                            Welcome,{" "}
                            <span className="font-semibold text-slate-900">
                                {localStorage.getItem("firstName") || "Student"}
                            </span>
                        </p>
                    </div>
                </header>

                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;