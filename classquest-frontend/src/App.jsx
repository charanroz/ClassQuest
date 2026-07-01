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
            </Routes>
        </BrowserRouter>
    );
}

export default App;