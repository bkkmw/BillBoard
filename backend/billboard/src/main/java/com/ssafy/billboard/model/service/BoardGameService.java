package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.BoardGameDto;
import com.ssafy.billboard.model.dto.FavoriteDto;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface BoardGameService {
    //보드 게임 목록 조회
    public List<BoardGameDto.BoardGame> getBoardGameList();

    //보드게임 상세조회
    public BoardGameDto.BoardGame getBoardGameDetail(long gameId);

    //보드게임 즐겨찾기 등록
    public boolean addFavoriteBoardGame(String userId, @RequestBody long gameId);

    //보드게임 즐겨찾기 조회
    public List<FavoriteDto.Favorite> getFavoriteBoardGames(String userId);
    //보드게임 즐겨찾기 삭제
    public boolean removeFavoriteBoardGame(String userId,long gameId);
}
