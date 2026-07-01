package com.charan.classquest.repository;

import com.charan.classquest.entity.ClassSession;
import com.charan.classquest.entity.Module;
import com.charan.classquest.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ClassSessionRepository extends JpaRepository<ClassSession, Long> {

    Optional<ClassSession> findByStudentAndModuleAndStartTime(
            Student student,
            Module module,
            LocalDateTime startTime
    );

    Optional<ClassSession> findFirstByStudentAndStartTimeAfterOrderByStartTimeAsc(
            Student student,
            LocalDateTime now
    );

    long countByStudentAndStartTimeBetween(
            Student student,
            LocalDateTime startOfWeek,
            LocalDateTime endOfWeek
    );

    List<ClassSession> findByStudentAndStartTimeBetweenOrderByStartTimeAsc(
            Student student,
            LocalDateTime start,
            LocalDateTime end
    );
}