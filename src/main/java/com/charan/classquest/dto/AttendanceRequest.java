package com.charan.classquest.dto;

import com.charan.classquest.entity.Status;

public class AttendanceRequest {

    private Long studentId;
    private  Long classSessionId;
    private Status status;

    public AttendanceRequest(){

    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getClassSessionId() {
        return classSessionId;
    }

    public void setClassSessionId(Long classSessionId) {
        this.classSessionId = classSessionId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
