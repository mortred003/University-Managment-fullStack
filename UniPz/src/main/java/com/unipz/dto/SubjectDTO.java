package com.unipz.dto;

public record SubjectDTO(
        Long id,
        String name,
        String description,
        Integer credits,
        String classroom,
        String time,
        String professorName,
        Long semesterId
) {}