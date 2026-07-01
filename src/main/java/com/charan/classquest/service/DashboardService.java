package com.charan.classquest.service;

import com.charan.classquest.dto.DashboardResponse;
import com.charan.classquest.entity.ClassSession;
import com.charan.classquest.entity.Status;
import com.charan.classquest.entity.Student;
import com.charan.classquest.exception.StudentNotFoundException;
import com.charan.classquest.repository.AttendanceRepository;
import com.charan.classquest.repository.ClassSessionRepository;
import com.charan.classquest.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Optional;

@Service
public class DashboardService {

    private final StudentRepository studentRepository;
    private final AttendanceRepository attendanceRepository;
    private final ClassSessionRepository classSessionRepository;

    public DashboardService(
            StudentRepository studentRepository,
            AttendanceRepository attendanceRepository,
            ClassSessionRepository classSessionRepository
    ) {
        this.studentRepository = studentRepository;
        this.attendanceRepository = attendanceRepository;
        this.classSessionRepository = classSessionRepository;
    }

    public DashboardResponse getDashboard(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        DashboardResponse response = new DashboardResponse();

        response.setFirstName(student.getFirstName());
        response.setCurrentStreak(student.getCurrentStreak());
        response.setTotalPoints(student.getTotalpoints());

        Optional<ClassSession> nextClass =
                classSessionRepository
                        .findFirstByStudentAndStartTimeAfterOrderByStartTimeAsc(
                                student,
                                LocalDateTime.now()
                        );

        nextClass.ifPresent(classSession -> {
            response.setNextClassTitle(classSession.getTitle());
            response.setNextClassTime(classSession.getStartTime());
            response.setNextClassLocation(classSession.getLocation());
        });

        LocalDate today = LocalDate.now();

        LocalDate monday =
                today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        LocalDate sunday =
                today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        LocalDateTime startOfWeek = monday.atStartOfDay();
        LocalDateTime endOfWeek = sunday.atTime(23, 59, 59);

        long totalClasses =
                classSessionRepository.countByStudentAndStartTimeBetween(
                        student,
                        startOfWeek,
                        endOfWeek
                );

        response.setTotalClassesThisWeek((int) totalClasses);

        long attendedThisWeek =
                attendanceRepository
                        .countByStudentAndStatusAndClassSession_StartTimeBetween(
                                student,
                                Status.PRESENT,
                                startOfWeek,
                                endOfWeek
                        );

        response.setAttendedThisWeek((int) attendedThisWeek);

        return response;
    }
}