package com.attendance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance.entity.Site;
import com.attendance.repository.SiteRepository;

@Service
public class SiteService {

	@Autowired
	private SiteRepository siteRepo;
	
	public Site createSite(Site site) {
		return siteRepo.save(site);
	}
	
	public List<Site> getAllSite(){
		return siteRepo.findAll();
	}
	public Site getSiteById(Long id) {
		return siteRepo.findById(id).orElse(null);
	}
	public void deleteSite(Long id) {
		siteRepo.deleteById(id);
	}
}
