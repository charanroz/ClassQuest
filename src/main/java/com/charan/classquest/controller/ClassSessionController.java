package com.charan.classquest.controller;

import com.charan.classquest.dto.ClassSessionResponse;
import com.charan.classquest.service.ClassSessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ClassSessionController {

    private final ClassSessionService classSessionService;

    public ClassSessionController(ClassSessionService classSessionService) {
        this.classSessionService = classSessionService;
    }

    @GetMapping("/students/{studentId}/today")
    public List<ClassSessionResponse> getTodayClasses(
            @PathVariable Long studentId
    ) {
        return classSessionService.getTodayClasses(studentId);
    }

    @GetMapping("/students/{studentId}/week")
    public List<ClassSessionResponse> getWeekClasses(
            @PathVariable Long studentId
    ) {
        return classSessionService.getWeekClasses(studentId);
    }
}