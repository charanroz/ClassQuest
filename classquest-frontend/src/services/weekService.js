import api from "../api/api";

export async function getWeekClasses(studentId) {
    const response = await api.get(`/students/${studentId}/week`);
    return response.data;
}