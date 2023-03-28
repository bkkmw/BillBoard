package com.ssafy.billboard.controller;


import com.ssafy.billboard.model.dto.BoardGameDto;
import com.ssafy.billboard.model.dto.FavoriteDto;
import com.ssafy.billboard.model.dto.ReviewDto;
import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.FavoriteID;
import com.ssafy.billboard.model.entity.Review;
import com.ssafy.billboard.model.service.BoardGameService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boardgames")
@Tag(name="[Board] BoardGame API")
@Slf4j
@RequiredArgsConstructor
public class BoardGameController {

    private static final Logger logger = LoggerFactory.getLogger(BoardGameController.class);
    private final BoardGameService boardGameService;


    //보드게임 목록 조회
    @GetMapping()
    public ResponseEntity<?> getBoardGames() {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        List<BoardGameDto.BoardGame> boardgames = boardGameService.getBoardGameList();
        if(boardgames == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        resultMap.put("boardgames",boardgames);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    //보드게임 상세 조회
    @GetMapping("/{gameId}")
    public ResponseEntity<?> getBoardGameDetail(@PathVariable int gameId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();

        BoardGameDto.BoardGame boardgame = boardGameService.getBoardGameDetail(gameId);
        if(boardgame == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        resultMap.put("boardgame",boardgame);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    //보드게임 즐겨찾기 등록
    @PostMapping("favorite/{userId}")
    public ResponseEntity<?> addFavoriteBoardgame(@PathVariable String userId, @RequestBody FavoriteDto.FavorGameId gameId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        System.out.println("start");
        Boolean isCreated = boardGameService.addFavoriteBoardGame(userId,gameId.getGameId());
        System.out.println(isCreated);
        if(!isCreated)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);

    }
    //보드게임 즐겨찾기 조회
    @GetMapping("favorite/{userId}")
    public ResponseEntity<?> getFavoriteBoardGames(@PathVariable String userId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        List<FavoriteDto.Favorite> favorites = boardGameService.getFavoriteBoardGames(userId);
        if(favorites == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(favorites.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("favorites",favorites);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
    //보드게임 즐겨찾기 해제
    @DeleteMapping("favorite/{userId}")
    public ResponseEntity<?> removeFavoriteBoardGame(@PathVariable String userId,@RequestBody FavoriteDto.FavorGameId gameId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        FavoriteID fvID = new FavoriteID(userId, gameId.getGameId());
        Boolean isRemoved = boardGameService.removeFavoriteBoardGame(fvID);
       if(!isRemoved)
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status); //빈 {} 리턴 중
    }
    //보드게임 리뷰 등록
    @PostMapping("review")
    public ResponseEntity<?> addBoardGameReview(@RequestBody ReviewDto.Review reviewDto) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        boolean isCreated = boardGameService.addBoardGameReview(reviewDto);
//        if(!isRemoved)
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status); //빈 {} 리턴 중
    }
    //보드게임 리뷰 조회
    @GetMapping("review/{gameId}")
    public ResponseEntity<?> getBoardGameReviewsGameId(@PathVariable int gameId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        List<ReviewDto.Review> reviews = boardGameService.getBoardGameReviewsGameId(gameId);
        if(reviews == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(reviews.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("reviews",reviews);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
    //보드게임 유저별 리뷰 조회
    @PostMapping("review/{userId}")
    public ResponseEntity<?> getBoardGameReviewsUserId(@PathVariable String userId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        List<ReviewDto.Review> reviews = boardGameService.getBoardGameReviewsUserId(userId);
        if(reviews == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(reviews.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("reviews",reviews);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
    //보드게임 리뷰 수정

    //보드게임 리뷰 삭제
    @DeleteMapping("review")
    public ResponseEntity<?> removeBoardGameReview(@RequestBody ReviewDto.ReviewID reviewDtoID) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        int count = boardGameService.removeBoardGimeReview(reviewDtoID);
        if(count == -1) //유저 없음
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(count == 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);


        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status); //빈 {} 리턴 중
    }
}
