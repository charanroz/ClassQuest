package com.charan.classquest.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Attendance {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private  Student student;
    @ManyToOne
    private ClassSession classSession;
    private Status status;
    private LocalDateTime markedAt;

    public Attendance(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public ClassSession getClassSession() {
        return classSession;
    }

    public void setClassSession(ClassSession classSession) {
        this.classSession = classSession;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getMarkedAt() {
        return markedAt;
    }

    public void setMarkedAt(LocalDateTime markerAt) {
        this.markedAt = markedAt;
    }
}
