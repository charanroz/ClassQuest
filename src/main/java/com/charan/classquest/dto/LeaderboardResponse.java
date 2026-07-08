package com.charan.classquest.dto;

public class LeaderboardResponse {

    private Long studentId;
    private String firstName;
    private int attendedThisWeek;
    private int totalClassesThisWeek;
    private double weeklyAttendancePercentage;
    private int currentStreak;

    public LeaderboardResponse(
            Long studentId,
            String firstName,
            int attendedThisWeek,
            int totalClassesThisWeek,
            double weeklyAttendancePercentage,
            int currentStreak
    ) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.attendedThisWeek = attendedThisWeek;
        this.totalClassesThisWeek = totalClassesThisWeek;
        this.weeklyAttendancePercentage = weeklyAttendancePercentage;
        this.currentStreak = currentStreak;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public int getAttendedThisWeek() {
        return attendedThisWeek;
    }

    public int getTotalClassesThisWeek() {
        return totalClassesThisWeek;
    }

    public double getWeeklyAttendancePercentage() {
        return weeklyAttendancePercentage;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }
}