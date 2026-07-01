package com.charan.classquest.dto;

import java.time.LocalDateTime;

public class ClassSessionResponse {

    private Long id;
    private String title;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String sessionType;

    public ClassSessionResponse() {
    }

    public ClassSessionResponse(Long id, String title, String location, LocalDateTime startTime, LocalDateTime endTime, String sessionType) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.startTime = startTime;
        this.endTime = endTime;
        this.sessionType = sessionType;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getLocation() { return location; }
    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public String getSessionType() { return sessionType; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setLocation(String location) { this.location = location; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public void setSessionType(String sessionType) { this.sessionType = sessionType; }
}