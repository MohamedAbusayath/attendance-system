package com.attendance.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance.entity.Attendance;
import com.attendance.repository.AttendanceRepository;

@Service
public class AttendanceService {

	    @Autowired
	    private AttendanceRepository attendanceRepository;

	    public Attendance markAttendance(Attendance attendance) {
	        return attendanceRepository.save(attendance);
	    }

	    public List<Attendance> getAllAttendance() {
	        return attendanceRepository.findAll();
	    }
	    
	    public List<Attendance> getAttendanceByDate(LocalDate date){
	        return attendanceRepository.findByDate(date);
	    }

	    public List<Attendance> getAttendanceByEmployee(Long employeeId){
	        return attendanceRepository.findByEmployeeId(employeeId);
	    }
}
