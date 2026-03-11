package com.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.attendance.entity.Site;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {

}
