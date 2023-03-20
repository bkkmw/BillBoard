package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
