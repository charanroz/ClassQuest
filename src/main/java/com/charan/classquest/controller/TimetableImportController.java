package com.charan.classquest.controller;

import com.charan.classquest.dto.TimetableImportRequest;
import com.charan.classquest.service.TimetableImportService;
import org.springframework.web.bind.annotation.*;

@RestController
public class TimetableImportController {

    private final TimetableImportService timetableImportService;

    public TimetableImportController(TimetableImportService timetableImportService) {
        this.timetableImportService = timetableImportService;
    }

    @PostMapping("/students/{studentId}/import")
    public String importTimetable(
            @PathVariable Long studentId,
            @RequestBody TimetableImportRequest request
    ) {

        timetableImportService.importTimetable(
                studentId,
                request.getTimetableLink()
        );

        return "Timetable imported successfully";
    }
}