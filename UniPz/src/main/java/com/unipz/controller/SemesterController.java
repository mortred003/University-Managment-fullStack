package com.unipz.controller;

import com.unipz.dto.SemesterDTO;
import com.unipz.model.Semester;
import com.unipz.service.SemesterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/semesters")
public class SemesterController {

    private final SemesterService semesterService;

    public SemesterController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @PostMapping
    public ResponseEntity<SemesterDTO> create(@RequestBody SemesterDTO dto) {
        Semester semEntity = new Semester();
        semEntity.setSemesterNo(dto.semesterNo());
        semEntity.setAcademicYear(dto.academicYear());

        Semester saved = semesterService.create(semEntity, dto.departmentId());
        SemesterDTO out = new SemesterDTO(
                saved.getId(),
                saved.getSemesterNo(),
                saved.getAcademicYear(),
                saved.getDepartment().getId(),
                saved.getDepartment().getName()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(out);
    }

}