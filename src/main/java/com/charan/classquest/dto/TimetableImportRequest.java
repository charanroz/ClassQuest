package com.charan.classquest.dto;

import jakarta.validation.constraints.NotBlank;

public class TimetableImportRequest {

    @NotBlank
    private String timetableLink;

    public TimetableImportRequest() {
    }

    public String getTimetableLink() {
        return timetableLink;
    }

    public void setTimetableLink(String timetableLink) {
        this.timetableLink = timetableLink;
    }
}