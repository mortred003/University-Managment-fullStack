package com.unipz.service;

import com.unipz.model.Department;
import com.unipz.controller.DepartmentController;
import com.unipz.model.Semester;
import com.unipz.repository.DepartmentRepository;
import com.unipz.repository.SemesterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service

public class SemesterService {

    private final SemesterRepository semesterRepository;
    private final DepartmentRepository departmentRepository;

    public SemesterService(SemesterRepository semesterRepository, DepartmentRepository departmentRepository) {
        this.semesterRepository = semesterRepository;
        this.departmentRepository = departmentRepository;
    }

    public Semester create(Semester semester, Long departmentId) {
        Department dept = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + departmentId));

        semester.setDepartment(dept);
        return semesterRepository.save(semester);
    }



    public Semester updateSemester(Long id, Semester semesterDetails) {
        Semester existing = semesterRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Semester not found with id " + id));
        existing.setSemesterNo(semesterDetails.getSemesterNo());
        existing.setAcademicYear(semesterDetails.getAcademicYear());
        // if you want to update department too, handle here
        return semesterRepository.save(existing);
    }

    public Semester getSemester(Long id) {
        return semesterRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Semester not found with id " + id));
    }

    public List<Semester> getSemestersByDepartment(Long departmentId) {
        return semesterRepository.findByDepartmentId(departmentId);
    }
    public Semester update(Long semesterId, Semester updatedSemesterData) {
        Semester existingSemester = semesterRepository.findById(semesterId)
                .orElseThrow(() -> new RuntimeException("Semester not found with id: " + semesterId));

        existingSemester.setSemesterNo(updatedSemesterData.getSemesterNo());
        existingSemester.setAcademicYear(updatedSemesterData.getAcademicYear());

        return semesterRepository.save(existingSemester);
    }
    public void delete(Long semesterId) {
        if (!semesterRepository.existsById(semesterId)) {
            throw new RuntimeException("Semester not found with id: " + semesterId);
        }
        semesterRepository.deleteById(semesterId);
    }

    public void deleteSemester(Long id) {
        semesterRepository.deleteById(id);
    }
    public Semester getById(Long id) {
        return semesterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semester not found with id: " + id));
    }
    public List<Semester> listByDepartment(Long departmentId) {
        return semesterRepository.findByDepartmentId(departmentId);
    }
}