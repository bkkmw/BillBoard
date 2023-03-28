package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.BoardGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardGameRepository extends JpaRepository<BoardGame,Integer> {

}
