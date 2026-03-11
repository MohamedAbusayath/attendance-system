package com.attendance.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendance.entity.Attendance;
import com.attendance.service.AttendanceService;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

	@Autowired
	private AttendanceService attendanceService;

	@PostMapping
	public Attendance markAttendance(@RequestBody Attendance attendance) {
		return attendanceService.markAttendance(attendance);
	}

	@GetMapping
	public List<Attendance> getAllAttendance() {
		return attendanceService.getAllAttendance();
	}

	@GetMapping("/date/{date}")
	public List<Attendance> getAttendanceByDate(@PathVariable String date) {

		LocalDate attendanceDate = LocalDate.parse(date);

		return attendanceService.getAttendanceByDate(attendanceDate);
	}

	@GetMapping("/employee/{id}")
	public List<Attendance> getAttendanceByEmployee(@PathVariable Long id) {
		return attendanceService.getAttendanceByEmployee(id);
	}
}
