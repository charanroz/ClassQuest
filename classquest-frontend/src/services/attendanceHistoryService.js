import api from "../api/api";

export async function getAttendanceHistory(studentId) {
    const response = await api.get(`/students/${studentId}/attendance-history`);
    return response.data;
}