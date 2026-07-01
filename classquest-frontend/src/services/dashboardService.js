import api from "../api/api";

export async function getDashboard(studentId) {
    const response = await api.get(`/students/${studentId}/dashboard`);
    return response.data;
}