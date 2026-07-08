import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award } from "lucide-react";
import { getBadges } from "../services/badgeService";

function Badges() {
    const [badges, setBadges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadBadges() {
            const studentId = localStorage.getItem("studentId");

            if (!studentId) {
                navigate("/");
                return;
            }

            const data = await getBadges(studentId);
            setBadges(data);
        }

        loadBadges();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Badges</h1>
                        <p className="mt-2 text-slate-500">Your earned achievements.</p>
                    </div>

                    <button onClick={() => navigate("/dashboard")} className="rounded-xl bg-indigo-600 px-4 py-2 text-white">
                        Dashboard
                    </button>
                </div>

                {badges.length === 0 ? (
                    <div className="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">
                        No badges earned yet.
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {badges.map((badge) => (
                            <div key={badge.id} className="rounded-2xl bg-white p-6 shadow-sm">
                                <Award className="h-8 w-8 text-yellow-500" />
                                <h2 className="mt-3 text-xl font-bold text-slate-900">
                                    {badge.name}
                                </h2>
                                <p className="mt-2 text-slate-500">
                                    {badge.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Badges;