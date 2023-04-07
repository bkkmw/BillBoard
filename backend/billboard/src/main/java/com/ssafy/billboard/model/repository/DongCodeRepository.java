package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.DongCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DongCodeRepository extends JpaRepository<DongCode, String> {
    List<DongCode> findAllByDongCodeStartsWith(String dongCode);
}
