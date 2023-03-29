package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.History;
import com.ssafy.billboard.model.entity.HistoryID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, HistoryID> {

    History findByUserIdAndBoardGameGameId(String userId, int gameId);

    List<History> findTop10ByUserIdOrderByUpdatedTimeDesc(String userId);

    List<History> findByUserId(String userId, Pageable pageable);
}
