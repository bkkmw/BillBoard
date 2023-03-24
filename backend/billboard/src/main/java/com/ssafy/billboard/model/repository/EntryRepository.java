package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    boolean existsByRoomIdAndUserId(long roomId, String userId);
    @Transactional
    void deleteByRoomIdAndUserId(long roomId, String userId);
}
