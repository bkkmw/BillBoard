package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.BaseAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseAddressRepository extends JpaRepository<BaseAddress, String> {
    public BaseAddress findOneByDongCode(String dongCode);
}
