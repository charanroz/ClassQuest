package com.charan.classquest.service;

import com.charan.classquest.dto.StudentLoginRequest;
import com.charan.classquest.dto.StudentLoginResponse;
import com.charan.classquest.dto.StudentRequest;
import com.charan.classquest.entity.Student;
import com.charan.classquest.exception.StudentNotFoundException;
import com.charan.classquest.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public Student createStudent(StudentRequest request) {

        String email = request.getEmail().trim();

        Optional<Student> existingStudent =
                studentRepository.findByEmail(email);

        if (existingStudent.isPresent()) {
            throw new RuntimeException(
                    "A student with this email already exists."
            );
        }

        Student student = new Student();
        student.setFirstName(request.getFirstName().trim());
        student.setLastName(request.getLastName().trim());
        student.setEmail(email);
        student.setPassword(request.getPassword());
        student.setTotalpoints(0);
        student.setCurrentStreak(0);

        return studentRepository.save(student);
    }

    public StudentLoginResponse login(StudentLoginRequest request) {

        System.out.println("========== LOGIN DEBUG ==========");
        System.out.println("Received email: " + request.getEmail());
        System.out.println("Received password: " + request.getPassword());

        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        System.out.println("Database email: " + student.getEmail());
        System.out.println("Database password: " + student.getPassword());

        if (!student.getPassword().equals(request.getPassword())) {
            System.out.println("Password does not match!");
            throw new RuntimeException("Invalid password");
        }

        System.out.println("Login successful!");

        return new StudentLoginResponse(
                student.getId(),
                student.getFirstName(),
                student.getEmail()
        );
    }
}