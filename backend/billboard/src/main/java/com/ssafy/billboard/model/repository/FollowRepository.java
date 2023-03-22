package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFromUserIdAndToUserId(String fromUserId, String toUserId);
    @Transactional
    void deleteByFromUserIdAndToUserId(String fromUserId, String toUserId);
    List<Follow> findAllByFromUserId(String fromUserId);
    List<Follow> findAllByToUserId(String toUserId);
}
