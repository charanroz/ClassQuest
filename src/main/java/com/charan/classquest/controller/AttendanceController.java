package com.charan.classquest.controller;

import com.charan.classquest.dto.AttendanceHistoryResponse;
import com.charan.classquest.dto.AttendanceRequest;
import com.charan.classquest.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/attendance")
    public void markAttendance(@RequestBody AttendanceRequest attendanceRequest) {
        attendanceService.markAttendance(
                attendanceRequest.getStudentId(),
                attendanceRequest.getClassSessionId(),
                attendanceRequest.getStatus()
        );
    }

    @GetMapping("/students/{studentId}/attendance-history")
    public List<AttendanceHistoryResponse> getAttendanceHistory(
            @PathVariable Long studentId
    ) {
        return attendanceService.getAttendanceHistory(studentId);
    }
}