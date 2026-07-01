package com.charan.classquest.dto;

public class StudentLoginResponse {

    private Long studentId;
    private String firstName;
    private String email;

    public StudentLoginResponse() {
    }

    public StudentLoginResponse(Long studentId, String firstName, String email) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.email = email;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}