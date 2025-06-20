package com.unipz.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;
    private String description;
    private int credits;
    private String classroom;
    private String time;
    private String profName;

    @ManyToOne
    @JsonIgnoreProperties("subjects")
    @JoinColumn(name = "semester_id")
    private Semester semester;

    public void setSemester(Semester semester) {
    }
}
