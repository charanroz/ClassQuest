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

    public Student createStudent(StudentRequest request){

        Optional<Student> existingStudent =
                studentRepository.findByEmail(request.getEmail());

        if (existingStudent.isPresent()) {
            throw new RuntimeException("A student with this email already exists.");
        }

        Student student = new Student();
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setEmail(request.getEmail());
        student.setPassword(request.getPassword());
        student.setTotalpoints(0);
        student.setCurrentStreak(0);

        return studentRepository.save(student);
    }

    public StudentLoginResponse login(StudentLoginRequest request) {
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        if (!student.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new StudentLoginResponse(
                student.getId(),
                student.getFirstName(),
                student.getEmail()
        );
    }
}