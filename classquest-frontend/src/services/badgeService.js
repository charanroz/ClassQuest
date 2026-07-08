import api from "../api/api";

export async function getBadges(studentId) {
    const response = await api.get(`/students/${studentId}/badges`);
    return response.data;
}