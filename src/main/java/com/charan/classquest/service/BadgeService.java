package com.charan.classquest.service;

import com.charan.classquest.entity.Badge;
import com.charan.classquest.entity.Student;
import com.charan.classquest.repository.BadgeRepository;
import com.charan.classquest.repository.StudentRepository;
import org.springframework.stereotype.Service;
import com.charan.classquest.dto.BadgeResponse;
import com.charan.classquest.exception.StudentNotFoundException;

import java.util.List;

@Service
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final StudentRepository studentRepository;

    public BadgeService(BadgeRepository badgeRepository,
                        StudentRepository studentRepository) {
        this.badgeRepository = badgeRepository;
        this.studentRepository = studentRepository;
    }

    public void checkAndAwardBadges(Student student) {

        if (student.getTotalpoints() >= 10) {
            awardBadge(
                    student,
                    "First Attendance",
                    "Awarded for attending your first class"
            );
        }

        if (student.getCurrentStreak() >= 5) {
            awardBadge(
                    student,
                    "5 Class Streak",
                    "Awarded for attending 5 classes in a row"
            );
        }
    }

    private void awardBadge(Student student, String badgeName, String description) {

        boolean alreadyHasBadge = student.getBadges()
                .stream()
                .anyMatch(badge -> badge.getName().equals(badgeName));

        if (alreadyHasBadge) {
            return;
        }

        Badge badge = badgeRepository.findByName(badgeName)
                .orElseGet(() -> {
                    Badge newBadge = new Badge();
                    newBadge.setName(badgeName);
                    newBadge.setDescription(description);
                    return badgeRepository.save(newBadge);
                });

        student.getBadges().add(badge);
        studentRepository.save(student);
    }

    public List<BadgeResponse> getStudentBadges(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        return student.getBadges()
                .stream()
                .map(badge -> new BadgeResponse(
                        badge.getId(),
                        badge.getName(),
                        badge.getDescription()
                ))
                .toList();
    }
}