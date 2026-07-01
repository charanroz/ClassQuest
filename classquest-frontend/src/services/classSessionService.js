import api from "../api/api";

export async function getTodayClasses(studentId) {
    const response = await api.get(`/students/${studentId}/today`);
    return response.data;
}