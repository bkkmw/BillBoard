package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserId(String userId);

    User findByEmail(String email);

    User findByUserIdAndEmail(String userId, String email);

    List<User> findTop10ByUserIdStartsWith(String keyword);
    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);
}
