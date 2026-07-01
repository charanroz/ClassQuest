package com.charan.classquest.repository;

import com.charan.classquest.entity.Attendance;
import com.charan.classquest.entity.ClassSession;
import com.charan.classquest.entity.Status;
import com.charan.classquest.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByStudentAndClassSession(
            Student student,
            ClassSession classSession
    );

    long countByStudentAndStatusAndClassSession_StartTimeBetween(
            Student student,
            Status status,
            LocalDateTime startOfWeek,
            LocalDateTime endOfWeek
    );

    List<Attendance> findByStudentOrderByMarkedAtDesc(Student student);
}