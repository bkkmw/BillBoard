package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Entry;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    boolean existsByRoomAndUser(Room room, User user);
    @Transactional
    void deleteByRoomAndUser(Room room, User user);
    List<Entry> findAllByUser(User user);
}
