package com.attendance.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance.dto.DashboardResponse;
import com.attendance.repository.AttendanceRepository;
import com.attendance.repository.EmployeeRepository;
import com.attendance.repository.SiteRepository;
import com.attendance.repository.TeamRepository;

@Service
public class DashboardService {

	@Autowired
    private SiteRepository siteRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public DashboardResponse getDashboardData(){

        DashboardResponse response = new DashboardResponse();

        response.setTotalSites(siteRepository.count());
        response.setTotalTeams(teamRepository.count());
        response.setTotalEmployees(employeeRepository.count());

        LocalDate today = LocalDate.now();

        response.setPresentToday(
            attendanceRepository.countByDateAndStatus(today,"Present")
        );

        response.setAbsentToday(
            attendanceRepository.countByDateAndStatus(today,"Absent")
        );

        return response;
    }
}
