package com.unipz.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

    @Entity
    @Getter
    @Setter
    public class Department {



    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;
        private String description;


        @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
@JsonManagedReference
    private List<Semester> semesters;
}
