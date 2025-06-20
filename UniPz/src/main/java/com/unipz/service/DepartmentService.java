package com.unipz.service;

import com.unipz.model.Department;
import com.unipz.repository.DepartmentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentRepository repo;

    public DepartmentService(DepartmentRepository repo) {
        this.repo = repo;
    }

    public Department create(Department d) {
        return repo.save(d);
    }

    public Department update(Long id, Department payload) {
        Department existing = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found: " + id));
        existing.setName(payload.getName());
        existing.setDescription(payload.getDescription());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Department> list() {
        return repo.findAll();
    }

    public Department get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found: " + id));
    }
}