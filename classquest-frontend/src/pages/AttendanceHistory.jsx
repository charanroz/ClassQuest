import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import { getAttendanceHistory } from "../services/attendanceHistoryService";

function AttendanceHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function loadHistory() {
            const studentId = localStorage.getItem("studentId");

            if (!studentId) {
                navigate("/");
                return;
            }

            try {
                const data = await getAttendanceHistory(studentId);
                setHistory(data);
            } catch {
                setMessage("Failed to load attendance history.");
            } finally {
                setLoading(false);
            }
        }

        loadHistory();
    }, [navigate]);

    if (loading) {
        return (
            <p className="p-6 text-slate-600">
                Loading attendance history...
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Attendance History
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Review your marked attendance records.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                    >
                        Dashboard
                    </button>
                </div>

                {message && (
                    <div className="mb-4 rounded-xl bg-red-50 p-4 text-red-700">
                        {message}
                    </div>
                )}

                {history.length === 0 ? (
                    <div className="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">
                        No attendance records yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((item) => (
                            <div
                                key={item.attendanceId}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            {item.status === "PRESENT" ? (
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-red-600" />
                                            )}

                                            <span
                                                className={
                                                    item.status === "PRESENT"
                                                        ? "font-semibold text-green-700"
                                                        : "font-semibold text-red-700"
                                                }
                                            >
                                                {item.status}
                                            </span>
                                        </div>

                                        <h2 className="mt-3 text-xl font-bold text-slate-900">
                                            {item.title}
                                        </h2>

                                        <p className="mt-1 text-sm text-indigo-600">
                                            {item.sessionType}
                                        </p>

                                        <div className="mt-3 space-y-2 text-slate-600">
                                            <p className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Class:{" "}
                                                {new Date(item.startTime).toLocaleString()}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Marked:{" "}
                                                {new Date(item.markedAt).toLocaleString()}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                {item.location || "Location not available"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AttendanceHistory;