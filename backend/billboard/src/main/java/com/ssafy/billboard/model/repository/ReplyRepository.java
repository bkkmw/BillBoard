package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Integer> {
    List<Reply> findAllByRoomId(int roomId);
}
