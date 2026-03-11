package com.attendance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attendance.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>  {

    List<Employee> findByTeamId(Long teamId);
}
