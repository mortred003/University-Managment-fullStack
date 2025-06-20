package com.unipz.dto;
public record SemesterDTO(
        Long id,
        int  semesterNo,
        String academicYear,
        Long departmentId,
        String departmentName
) {}