package com.charan.classquest.controller;

import com.charan.classquest.dto.StudentLoginRequest;
import com.charan.classquest.dto.StudentLoginResponse;
import com.charan.classquest.dto.StudentRequest;
import com.charan.classquest.entity.Student;
import com.charan.classquest.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    private StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping("/students")
    public Student createStudent(@Valid @RequestBody StudentRequest request) {
        return studentService.createStudent(request);
    }

    @PostMapping("/login")
    public StudentLoginResponse login(@Valid @RequestBody StudentLoginRequest request) {
        return studentService.login(request);
    }
}
