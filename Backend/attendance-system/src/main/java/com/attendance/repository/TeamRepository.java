package com.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attendance.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Long>{

}
