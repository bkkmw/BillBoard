package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Entry;
import com.ssafy.billboard.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    boolean existsByRoomAndUserId(Room room, String userId);
    @Transactional
    void deleteByRoomAndUserId(Room room, String userId);
    List<Entry> findAllByUserId(String userId);
}
