import api from "../api/api";

export async function getLeaderboard() {
    const response = await api.get("/leaderboard");
    return response.data;
}