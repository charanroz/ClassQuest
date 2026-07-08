import api from "../api/api";

export async function importTimetable(studentId, timetableLink) {
    const response = await api.post(`/students/${studentId}/import`, {
        timetableLink,
    });

    return response.data;
}