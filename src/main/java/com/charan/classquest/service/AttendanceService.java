package com.charan.classquest.service;

import com.charan.classquest.dto.AttendanceHistoryResponse;
import com.charan.classquest.entity.Attendance;
import com.charan.classquest.entity.ClassSession;
import com.charan.classquest.entity.Status;
import com.charan.classquest.entity.Student;
import com.charan.classquest.exception.StudentNotFoundException;
import com.charan.classquest.repository.AttendanceRepository;
import com.charan.classquest.repository.ClassSessionRepository;
import com.charan.classquest.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    private AttendanceRepository attendanceRepository;
    private ClassSessionRepository classSessionRepository;
    private StudentRepository studentRepository;
    private  BadgeService badgeService;

    public AttendanceService(AttendanceRepository attendanceRepository, ClassSessionRepository classSessionRepository, StudentRepository studentRepository, BadgeService badgeService) {
        this.attendanceRepository = attendanceRepository;
        this.classSessionRepository = classSessionRepository;
        this.studentRepository = studentRepository;
        this.badgeService = badgeService;
    }

    public void markAttendance(Long studentId, Long classSessionId, Status status){
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        ClassSession classSession = classSessionRepository.findById(classSessionId)
                .orElseThrow(() -> new RuntimeException("Class session not found"));


        if (status == Status.PRESENT) {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime classStart = classSession.getStartTime();
            LocalDateTime latestAllowedTime = classStart.plusMinutes(15);

            if (now.isBefore(classStart) || now.isAfter(latestAllowedTime)) {
                throw new RuntimeException("You can only mark present within 15 minutes of the class start time.");
            }
        }

        Optional<Attendance> existingAttendance = attendanceRepository.findByStudentAndClassSession(student,classSession);

        Attendance attendance;
        if (existingAttendance.isPresent()){
            attendance = existingAttendance.get();
        }
        else {
            attendance = new Attendance();
            attendance.setStudent(student);
            attendance.setClassSession(classSession);

        }
        Status oldStatus = null;

        if (existingAttendance.isPresent()) {
            oldStatus = existingAttendance.get().getStatus();
        }

        if (oldStatus != Status.PRESENT && status == Status.PRESENT) {
            student.setTotalpoints(student.getTotalpoints() + 10);
            student.setCurrentStreak(student.getCurrentStreak() + 1);
        }

        if (oldStatus == Status.PRESENT && status == Status.ABSENT) {
            student.setTotalpoints(student.getTotalpoints() - 10);
            student.setCurrentStreak(0);
        }


        attendance.setStatus(status);
        attendance.setMarkedAt(LocalDateTime.now());
        studentRepository.save(student);
        badgeService.checkAndAwardBadges(student);
        attendanceRepository.save(attendance);
    }

    public List<AttendanceHistoryResponse> getAttendanceHistory(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        return attendanceRepository.findByStudentOrderByMarkedAtDesc(student)
                .stream()
                .map(attendance -> new AttendanceHistoryResponse(
                        attendance.getId(),
                        attendance.getClassSession().getId(),
                        attendance.getClassSession().getTitle(),
                        attendance.getClassSession().getSessionType(),
                        attendance.getClassSession().getLocation(),
                        attendance.getClassSession().getStartTime(),
                        attendance.getMarkedAt(),
                        attendance.getStatus()
                ))
                .toList();
    }
}
