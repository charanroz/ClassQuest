package com.charan.classquest.dto;

import com.charan.classquest.entity.Status;

import java.time.LocalDateTime;

public class AttendanceHistoryResponse {

    private Long attendanceId;
    private Long classSessionId;
    private String title;
    private String sessionType;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime markedAt;
    private Status status;

    public AttendanceHistoryResponse() {
    }

    public AttendanceHistoryResponse(
            Long attendanceId,
            Long classSessionId,
            String title,
            String sessionType,
            String location,
            LocalDateTime startTime,
            LocalDateTime markedAt,
            Status status
    ) {
        this.attendanceId = attendanceId;
        this.classSessionId = classSessionId;
        this.title = title;
        this.sessionType = sessionType;
        this.location = location;
        this.startTime = startTime;
        this.markedAt = markedAt;
        this.status = status;
    }

    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    public Long getClassSessionId() {
        return classSessionId;
    }

    public void setClassSessionId(Long classSessionId) {
        this.classSessionId = classSessionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getMarkedAt() {
        return markedAt;
    }

    public void setMarkedAt(LocalDateTime markedAt) {
        this.markedAt = markedAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}