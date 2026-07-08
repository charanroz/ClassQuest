package com.charan.classquest.controller;

import com.charan.classquest.dto.BadgeResponse;
import com.charan.classquest.service.BadgeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BadgeController {

    private final BadgeService badgeService;

    public BadgeController(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    @GetMapping("/students/{studentId}/badges")
    public List<BadgeResponse> getStudentBadges(
            @PathVariable Long studentId
    ) {
        return badgeService.getStudentBadges(studentId);
    }
}