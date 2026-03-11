package com.attendance.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendance.entity.Team;
import com.attendance.service.TeamService;

@RestController
@RequestMapping("/teams")
@CrossOrigin(origins = "*")
public class TeamController {

	@Autowired
	private TeamService teamSer;
	@PostMapping
	public Team createTeam(@RequestBody Team team){
		return teamSer.createTeam(team);
	}
	@GetMapping
	public List<Team> getAll(){
		return teamSer.getAllTeams();
	}
}
