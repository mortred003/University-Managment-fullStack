package com.unipz.service;

import com.unipz.model.Subject;
import com.unipz.model.Semester;
import com.unipz.repository.SubjectRepository;
import com.unipz.repository.SemesterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final SemesterRepository semesterRepository;

    public SubjectService(SubjectRepository subjectRepository,
                          SemesterRepository semesterRepository) {
        this.subjectRepository = subjectRepository;
        this.semesterRepository = semesterRepository;
    }

    public Subject save(Subject subject, Long semesterId ) {
        Semester sem = semesterRepository.findById(semesterId)
                .orElseThrow(() -> new RuntimeException("Semester id " + semesterId + " not found"));
        subject.setSemester(sem);
        return subjectRepository.save(subject);
    }

    public Subject get(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Subject not found id " + id));
    }

    public List<Subject> findBySemester(Long semId) {
        return subjectRepository.findBySemesterId(semId);
    }

    public void delete(Long id) { subjectRepository.deleteById(id); }
}