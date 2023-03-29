package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.dto.BoardGameDto;
import com.ssafy.billboard.model.entity.BoardGame;
import com.ssafy.billboard.model.entity.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardGameRepository extends JpaRepository<BoardGame,Integer> {
    List<BoardGame> findTop10ByOrderByBoardgamerankDesc();

    //List<BoardGameDto.BoardGame> getBoardGameDynamic(String primary, String familygamerank);
}
