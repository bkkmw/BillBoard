package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.SidoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SidoCodeRepository extends JpaRepository<SidoCode, String> {
}
