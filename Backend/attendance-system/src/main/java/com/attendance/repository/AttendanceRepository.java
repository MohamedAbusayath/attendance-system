package com.attendance.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.attendance.entity.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

	    List<Attendance> findByDate(LocalDate date);

	    List<Attendance> findByEmployeeId(Long employeeId);
	    
	    Long countByDateAndStatus(LocalDate date, String status);
}
