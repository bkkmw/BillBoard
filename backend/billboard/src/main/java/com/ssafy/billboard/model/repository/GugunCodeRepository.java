package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.GugunCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GugunCodeRepository extends JpaRepository<GugunCode, String> {
    List<GugunCode> findAllByGugunCodeStartsWith(String gugunCode);
}
