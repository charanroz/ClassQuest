package com.charan.classquest.service;

import com.charan.classquest.dto.ClassSessionResponse;
import com.charan.classquest.entity.ClassSession;
import com.charan.classquest.entity.Student;
import com.charan.classquest.exception.StudentNotFoundException;
import com.charan.classquest.repository.ClassSessionRepository;
import com.charan.classquest.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
public class ClassSessionService {

    private final ClassSessionRepository classSessionRepository;
    private final StudentRepository studentRepository;

    public ClassSessionService(
            ClassSessionRepository classSessionRepository,
            StudentRepository studentRepository
    ) {
        this.classSessionRepository = classSessionRepository;
        this.studentRepository = studentRepository;
    }

    public List<ClassSessionResponse> getTodayClasses(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        LocalDate today = LocalDate.now();

        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        return classSessionRepository
                .findByStudentAndStartTimeBetweenOrderByStartTimeAsc(
                        student,
                        startOfDay,
                        endOfDay
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ClassSessionResponse> getWeekClasses(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        LocalDate today = LocalDate.now();

        LocalDate monday =
                today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        LocalDate sunday =
                today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        LocalDateTime startOfWeek = monday.atStartOfDay();
        LocalDateTime endOfWeek = sunday.atTime(23, 59, 59);

        return classSessionRepository
                .findByStudentAndStartTimeBetweenOrderByStartTimeAsc(
                        student,
                        startOfWeek,
                        endOfWeek
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ClassSessionResponse toResponse(ClassSession classSession) {

        return new ClassSessionResponse(
                classSession.getId(),
                classSession.getTitle(),
                classSession.getLocation(),
                classSession.getStartTime(),
                classSession.getEndTime(),
                classSession.getSessionType()
        );
    }
}