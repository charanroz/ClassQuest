package com.charan.classquest.dto;

import java.time.LocalDateTime;

public class DashboardResponse {

    private String firstName;
    private String nextClassLocation;
    private int currentStreak;
    private int totalPoints;
    private int attendedThisWeek;
    private int totalClassesThisWeek;
    private String nextClassTitle;
    private LocalDateTime nextClassTime;

    public  DashboardResponse(){

    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getNextClassLocation() {
        return nextClassLocation;
    }

    public void setNextClassLocation(String nextClassLocation) {
        this.nextClassLocation = nextClassLocation;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public int getAttendedThisWeek() {
        return attendedThisWeek;
    }

    public void setAttendedThisWeek(int attendedThisWeek) {
        this.attendedThisWeek = attendedThisWeek;
    }

    public int getTotalClassesThisWeek() {
        return totalClassesThisWeek;
    }

    public void setTotalClassesThisWeek(int totalClassesThisWeek) {
        this.totalClassesThisWeek = totalClassesThisWeek;
    }

    public String getNextClassTitle() {
        return nextClassTitle;
    }

    public void setNextClassTitle(String nextClassTitle) {
        this.nextClassTitle = nextClassTitle;
    }

    public LocalDateTime getNextClassTime() {
        return nextClassTime;
    }

    public void setNextClassTime(LocalDateTime nextClassTime) {
        this.nextClassTime = nextClassTime;
    }
}
