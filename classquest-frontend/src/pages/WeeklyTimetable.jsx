import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getWeekClasses } from "../services/weekService";

function WeeklyTimetable() {

    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadWeek() {

            const studentId = localStorage.getItem("studentId");

            if (!studentId) {
                navigate("/");
                return;
            }

            try {

                const data = await getWeekClasses(studentId);
                setClasses(data);

            } finally {

                setLoading(false);

            }

        }

        loadWeek();

    }, [navigate]);

    if (loading) {
        return (
            <p className="p-6">
                Loading timetable...
            </p>
        );
    }

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            <div className="mx-auto max-w-5xl">

                <div className="mb-6 flex justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Weekly Timetable
                        </h1>

                        <p className="text-slate-500">
                            Your imported classes
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                    >
                        Dashboard
                    </button>

                </div>

                <div className="space-y-4">

                    {classes.map((c) => (

                        <div
                            key={c.id}
                            className="rounded-xl bg-white p-5 shadow"
                        >

                            <div className="flex items-center gap-2 text-indigo-600">

                                <Calendar size={18} />

                                <span className="font-semibold">
                                    {new Date(c.startTime).toLocaleDateString()}
                                </span>

                            </div>

                            <h2 className="mt-3 text-xl font-bold">
                                {c.title}
                            </h2>

                            <p className="mt-2 flex items-center gap-2">

                                <Clock size={16} />

                                {new Date(c.startTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}

                                -

                                {new Date(c.endTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}

                            </p>

                            <p className="mt-2 flex items-center gap-2">

                                <MapPin size={16} />

                                {c.location}

                            </p>

                            <p className="mt-2 rounded bg-indigo-100 px-3 py-1 inline-block text-indigo-700">

                                {c.sessionType}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default WeeklyTimetable;