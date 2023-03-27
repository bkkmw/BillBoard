package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Follow;
import com.ssafy.billboard.model.entity.SidoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface SidoCodeRepository extends JpaRepository<SidoCode, String> {
}
