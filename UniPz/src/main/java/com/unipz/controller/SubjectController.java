package com.unipz.controller;

import com.unipz.dto.SubjectDTO;
import com.unipz.model.Subject;
import com.unipz.service.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    /**/
    @PostMapping
    public ResponseEntity<SubjectDTO> create(@RequestBody SubjectDTO dto) {
        Subject s = new Subject();
        copy(dto, s);
        Subject saved = subjectService.save(s, dto.semesterId());
        return ResponseEntity.status(HttpStatus.CREATED).body(toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectDTO> update(@PathVariable Long id,
                                             @RequestBody SubjectDTO dto) {
        Subject s = subjectService.get(id);
        copy(dto, s);
        Subject saved = subjectService.save(s, dto.semesterId());  // pass ID ✔
        return ResponseEntity.ok(toDto(saved));
    }

@GetMapping("/semester/{semId}")
public List<SubjectDTO> listBySemester(@PathVariable Long semId) {
    return subjectService.findBySemester(semId).stream()
            .map(this::toDto)
            .toList();
}

    private void copy(SubjectDTO dto, Subject s) {
        s.setName(dto.name());
        s.setDescription(dto.description());
        s.setCredits(dto.credits());
        s.setClassroom(dto.classroom());
        s.setTime(dto.time());
        s.setProfName(dto.professorName());
    }

    private SubjectDTO toDto(Subject s) {
        Long semId = (s.getSemester() != null) ? s.getSemester().getId() : null;
        return toDto(s, semId);
    }

    private SubjectDTO toDto(Subject s, Long semesterId) {
        return new SubjectDTO(
                s.getId(),
                s.getName(),
                s.getDescription(),
                s.getCredits(),
                s.getClassroom(),
                s.getTime(),
                s.getProfName(),
                semesterId
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<SubjectDTO> getById(@PathVariable Long id) {
        Subject s = subjectService.get(id);
        return ResponseEntity.ok(toDto(s));
    }
}