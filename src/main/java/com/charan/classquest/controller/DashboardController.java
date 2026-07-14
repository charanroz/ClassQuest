package com.charan.classquest.controller;

import com.charan.classquest.dto.DashboardResponse;
import com.charan.classquest.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
public class DashboardController {

    private DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/students/{studentId}/dashboard")
    public DashboardResponse getDashboard(@PathVariable Long studentId) {
        return dashboardService.getDashboard(studentId);
    }

}