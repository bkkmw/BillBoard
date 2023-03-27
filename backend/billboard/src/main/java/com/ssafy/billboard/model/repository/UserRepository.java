package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserId(String userId);

    User findByEmail(String email);

    User findByUserIdAndEmail(String userId, String email);

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);
}
