package com.attendance.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.attendance.entity.Site;
import com.attendance.service.SiteService;

@RestController
@RequestMapping("/sites")
@CrossOrigin(origins = "*")
public class SiteController {

	@Autowired
	private SiteService siteSer;
	
	@PostMapping
	public Site createSite(@RequestBody Site site) {
		return siteSer.createSite(site);
	}
	@GetMapping
	public List<Site> getAll(){
		return siteSer.getAllSite();
	}
	@GetMapping("/{id}")
	public Site getSiteById(@PathVariable Long id) {
		return siteSer.getSiteById(id);
	}
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		siteSer.deleteSite(id);
	}
}
