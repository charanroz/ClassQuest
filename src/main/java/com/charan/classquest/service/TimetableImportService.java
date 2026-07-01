package com.charan.classquest.service;

import com.charan.classquest.entity.ClassSession;
import com.charan.classquest.entity.Module;
import com.charan.classquest.entity.Student;
import com.charan.classquest.exception.StudentNotFoundException;
import com.charan.classquest.repository.ClassSessionRepository;
import com.charan.classquest.repository.ModuleRepository;
import com.charan.classquest.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class TimetableImportService {

    private ModuleRepository moduleRepository;
    private ClassSessionRepository classSessionRepository;
    private StudentRepository studentRepository;

    public TimetableImportService(
            ModuleRepository moduleRepository,
            ClassSessionRepository classSessionRepository,
            StudentRepository studentRepository
    ) {
        this.moduleRepository = moduleRepository;
        this.classSessionRepository = classSessionRepository;
        this.studentRepository = studentRepository;
    }

    public void importTimetable(Long studentId, String timeTableLink) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        if (timeTableLink == null || timeTableLink.isBlank()) {
            throw new IllegalArgumentException("Link cannot be null.");
        }

        if (!(timeTableLink.startsWith("webcal://") || timeTableLink.startsWith("https://"))) {
            throw new IllegalArgumentException(
                    "Invalid URL protocol: Link must start with 'webcal://' or 'https://'."
            );
        }

        if (timeTableLink.startsWith("webcal://")) {
            timeTableLink = "https://" + timeTableLink.substring(9);
        }

        String calendarContent = downloadCalendar(timeTableLink);
        parseCalendar(calendarContent, student);
    }

    private String downloadCalendar(String timeTableLink) {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(timeTableLink))
                .GET()
                .build();

        try {
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new RuntimeException(
                        "Failed to download calendar. Status code: " + response.statusCode()
                );
            }

            return response.body();

        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }

            throw new RuntimeException(
                    "Error downloading calendar from: " + timeTableLink,
                    e
            );
        }
    }

    private void parseCalendar(String calendarContent, Student student) {

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss");

        String[] events = calendarContent.split("BEGIN:VEVENT");

        for (int i = 1; i < events.length; i++) {

            String summary = "";
            String moduleCode = "";
            String location = "";
            String startTime = "";
            String endTime = "";
            String description = "";

            String event = events[i];
            String[] lines = event.split("\n");

            for (String line : lines) {
                if (line.startsWith("SUMMARY:")) {
                    summary = line.substring(8);
                }

                if (line.startsWith("LOCATION:")) {
                    location = line.substring(9);
                }

                if (line.startsWith("DTSTART")) {
                    startTime = line.substring(line.indexOf(":") + 1);
                }

                if (line.startsWith("DTEND")) {
                    endTime = line.substring(line.indexOf(":") + 1);
                }

                if (line.startsWith("DESCRIPTION:")) {
                    String value = line.substring(12);

                    if (!value.equals("Reminder")) {
                        description = value;
                    }
                }
            }

            if (startTime.isBlank() || endTime.isBlank() || summary.isBlank()) {
                continue;
            }

            LocalDateTime startDateTime =
                    LocalDateTime.parse(startTime, formatter);

            LocalDateTime endDateTime =
                    LocalDateTime.parse(endTime, formatter);

            String[] summaryParts = summary.split("/");
            moduleCode = summaryParts[0];

            String[] descriptionParts = description.split("\\\\n");

            String moduleName =
                    descriptionParts.length > 0 ? descriptionParts[0] : moduleCode;

            String sessionType =
                    descriptionParts.length > 1 ? descriptionParts[1] : "Class";

            Module module;

            Optional<Module> existingModule =
                    moduleRepository.findByModuleCode(moduleCode);

            if (existingModule.isPresent()) {
                module = existingModule.get();
            } else {
                Module newModule = new Module();
                newModule.setModuleCode(moduleCode);
                newModule.setModuleName(moduleName);

                module = moduleRepository.save(newModule);
            }

            Optional<ClassSession> existingClassSession =
                    classSessionRepository.findByStudentAndModuleAndStartTime(
                            student,
                            module,
                            startDateTime
                    );

            if (existingClassSession.isPresent()) {
                continue;
            }

            ClassSession newClassSession = new ClassSession();
            newClassSession.setStudent(student);
            newClassSession.setModule(module);
            newClassSession.setLocation(location);
            newClassSession.setStartTime(startDateTime);
            newClassSession.setEndTime(endDateTime);
            newClassSession.setTitle(moduleName);
            newClassSession.setSessionType(sessionType);

            classSessionRepository.save(newClassSession);
        }
    }
}