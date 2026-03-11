package com.attendance.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    private String role;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
    
    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private List<Attendance> attendance;
}