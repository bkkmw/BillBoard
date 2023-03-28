package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.BoardGameDto;
import com.ssafy.billboard.model.dto.FavoriteDto;
import com.ssafy.billboard.model.dto.ReviewDto;
import com.ssafy.billboard.model.entity.FavoriteID;
import com.ssafy.billboard.model.entity.Review;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface BoardGameService {
    //보드 게임 목록 조회
    public List<BoardGameDto.BoardGame> getBoardGameList();

    //보드게임 상세조회
    public BoardGameDto.BoardGame getBoardGameDetail(int gameId);

    //보드게임 즐겨찾기 등록
    public boolean addFavoriteBoardGame(String userId, @RequestBody int gameId);

    //보드게임 즐겨찾기 조회
    public List<FavoriteDto.Favorite> getFavoriteBoardGames(String userId);
    //보드게임 즐겨찾기 삭제
    public boolean removeFavoriteBoardGame(FavoriteID favoriteID);

    //보드게임 리뷰 등록
    public boolean addBoardGameReview(@RequestBody ReviewDto.Review reviewDto);
    //보드게임 리뷰 조회
    public List<ReviewDto.Review> getBoardGameReviewsGameId(int gameId);
    //보드게임 유저별 리뷰 조회
    public List<ReviewDto.Review> getBoardGameReviewsUserId(String userId);
    //보드게임 리뷰 수정

    //보드게임 리뷰 삭제
    public int removeBoardGimeReview(ReviewDto.ReviewID reviewID);

}
