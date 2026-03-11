package com.attendance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance.entity.Team;
import com.attendance.repository.TeamRepository;

@Service
public class TeamService {

	@Autowired
	private TeamRepository teamRepo;
	
	public Team createTeam(Team team) {
		return teamRepo.save(team);
	}
	
	public List<Team> getAllTeams(){
		return teamRepo.findAll();
	}
}
