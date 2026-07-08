package com.charan.classquest.service;

import com.charan.classquest.dto.LeaderboardResponse;
import com.charan.classquest.entity.Status;
import com.charan.classquest.repository.AttendanceRepository;
import com.charan.classquest.repository.ClassSessionRepository;
import com.charan.classquest.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Comparator;
import java.util.List;

@Service
public class LeaderboardService {

    private final StudentRepository studentRepository;
    private final ClassSessionRepository classSessionRepository;
    private final AttendanceRepository attendanceRepository;

    public LeaderboardService(
            StudentRepository studentRepository,
            ClassSessionRepository classSessionRepository,
            AttendanceRepository attendanceRepository
    ) {
        this.studentRepository = studentRepository;
        this.classSessionRepository = classSessionRepository;
        this.attendanceRepository = attendanceRepository;
    }

    public List<LeaderboardResponse> getLeaderboard() {

        LocalDate today = LocalDate.now();

        LocalDate monday =
                today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        LocalDate sunday =
                today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        LocalDateTime startOfWeek = monday.atStartOfDay();
        LocalDateTime endOfWeek = sunday.atTime(LocalTime.MAX);

        return studentRepository.findAll()
                .stream()
                .map(student -> {
                    long totalClassesThisWeek =
                            classSessionRepository.countByStudentAndStartTimeBetween(
                                    student,
                                    startOfWeek,
                                    endOfWeek
                            );

                    long attendedThisWeek =
                            attendanceRepository.countByStudentAndStatusAndClassSession_StartTimeBetween(
                                    student,
                                    Status.PRESENT,
                                    startOfWeek,
                                    endOfWeek
                            );

                    double weeklyAttendancePercentage = 0;

                    if (totalClassesThisWeek > 0) {
                        weeklyAttendancePercentage =
                                ((double) attendedThisWeek / totalClassesThisWeek) * 100;
                    }

                    return new LeaderboardResponse(
                            student.getId(),
                            student.getFirstName(),
                            (int) attendedThisWeek,
                            (int) totalClassesThisWeek,
                            weeklyAttendancePercentage,
                            student.getCurrentStreak()
                    );
                })
                .sorted(Comparator.comparingDouble(LeaderboardResponse::getWeeklyAttendancePercentage).reversed())
                .toList();
    }
}