import api from "../api/api";

export async function markAttendance(studentId, classSessionId, status) {
    const response = await api.post("/attendance", {
        studentId,
        classSessionId,
        status,
    });

    return response.data;
}