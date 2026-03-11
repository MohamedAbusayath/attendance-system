package com.attendance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

	private long totalSites;
    private long totalTeams;
    private long totalEmployees;
    private long presentToday;
    private long absentToday;
    
}
