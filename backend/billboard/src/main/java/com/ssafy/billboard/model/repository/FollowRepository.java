package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Follow;
import com.ssafy.billboard.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFromUserAndToUser(User fromUser, User toUser);
    @Transactional
    void deleteByFromUserAndToUser(User fromUser, User toUser);
    List<Follow> findAllByFromUser(User fromUser);
    List<Follow> findAllByToUser(User toUser);
}
