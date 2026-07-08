import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TodayClasses from "./pages/TodayClasses";
import WeeklyTimetable from "./pages/WeeklyTimetable";
import AttendanceHistory from "./pages/AttendanceHistory";
import Signup from "./pages/Signup";
import Badges from "./pages/Badges";
import ImportTimetable from "./pages/ImportTimetable";
import Leaderboard from "./pages/Leaderboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/today" element={<TodayClasses />} />
                <Route path="/week" element={<WeeklyTimetable />} />
                <Route path="/history" element={<AttendanceHistory />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/badges" element={<Badges />} />
                <Route path="/import" element={<ImportTimetable />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;