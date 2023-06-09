package com.ssafy.billboard.controller;


import com.ssafy.billboard.model.dto.BoardGameDto;
import com.ssafy.billboard.model.dto.FavoriteDto;
import com.ssafy.billboard.model.dto.ReviewDto;
import com.ssafy.billboard.model.dto.UserDto;
import com.ssafy.billboard.model.entity.FavoriteID;
import com.ssafy.billboard.model.service.BoardGameService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/api/boardgames")
@Tag(name="[Board] BoardGame API")
@Slf4j
@RequiredArgsConstructor
public class BoardGameController {
    private static AtomicInteger reviewCount = new AtomicInteger();
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

    //보드게임 조건 조회
    @PostMapping("/condition")
    public ResponseEntity<?> getBoardGameDynamic(@RequestBody BoardGameDto.BoardGameDetail boardGameDetail) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        List<BoardGameDto.BoardGame> rank = boardGameService.getBoardGameDynamic1(boardGameDetail);
        if(rank == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        List<BoardGameDto.BoardGame> average = boardGameService.getBoardGameDynamic2(boardGameDetail);
        List<BoardGameDto.BoardGame> yearpublished = boardGameService.getBoardGameDynamic3(boardGameDetail);
        List<BoardGameDto.BoardGame> weights = boardGameService.getBoardGameDynamic4(boardGameDetail);
        List<BoardGameDto.BoardGame> review = boardGameService.getBoardGameDynamic5(boardGameDetail);
        resultMap.put("rank",rank);
        resultMap.put("average",average);
        resultMap.put("yearpublished",yearpublished);
        resultMap.put("weights",weights);
        resultMap.put("review",review);

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
        List<BoardGameDto.BoardGame> favorites = boardGameService.getFavoriteBoardGames(userId);
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
        FavoriteID fvID = new FavoriteID(userId,gameId.getGameId());
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
        boolean isRemoved = boardGameService.addBoardGameReview(reviewDto);
        System.out.println(isRemoved);
        if(!isRemoved)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        status = HttpStatus.OK;
        reviewCount.getAndAdd(1);
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
    @GetMapping("review/user/{userId}")
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

    //보드 게임 1인 추천
    @GetMapping("/recommend/{userId}")
    public ResponseEntity<?> getBoardGameRecommendOne(@PathVariable String userId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();

        RestTemplate restTemplate = new RestTemplate();
        //fastapi에 요청 보내기 get 방식
        String url = "http://j8a505.p.ssafy.io:8000/recommendation/" + userId;
        ResponseEntity<Integer[]> response = restTemplate.getForEntity(url, Integer[].class);
        if(response.getStatusCode() == HttpStatus.OK) {
            List<BoardGameDto.BoardGameInfo> games = boardGameService.getBoardGameListByIds(response.getBody());
            if(games.size() == 0)
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            resultMap.put("games", games);
            status = HttpStatus.OK;
            return new ResponseEntity<Map<String, Object>>(resultMap, status);
        }
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }


    //보드 게임 다인 추천
    @PostMapping("/recommend")
    public ResponseEntity<?> getBoardGameRecommend(@RequestBody UserDto.UserIdDto userIdList) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        //RequestBody로 온것을 List에 담기
        List<String> list = userIdList.getUserList();

        RestTemplate restTemplate = new RestTemplate();
        //fastapi에 요청 보내기

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<String>> request = new HttpEntity<>(list, headers);
        String url = "http://j8a505.p.ssafy.io:8000/recommendation";
        ResponseEntity<Integer[]> response = restTemplate.postForEntity(url, request, Integer[].class);
        if(response.getStatusCode() == HttpStatus.OK) {
            List<BoardGameDto.BoardGameInfo> games = boardGameService.getBoardGameListByIds(response.getBody());
            if(games.size() == 0)
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            resultMap.put("games", games);
            status = HttpStatus.OK;
            return new ResponseEntity<Map<String, Object>>(resultMap, status);
        }
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //보드게임 리뷰 삭제
    @DeleteMapping("/review")
    public ResponseEntity<?> removeBoardGameReview(@RequestBody ReviewDto.ReviewID reviewDtoID) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        int count = boardGameService.removeBoardGimeReview(reviewDtoID);
        if(count == -1) //유저 없음
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(count == 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        status = HttpStatus.OK;
        reviewCount.getAndAdd(1);
        return new ResponseEntity<Map<String, Object>>(resultMap, status); //빈 {} 리턴 중
    }

    @PostMapping()
    public ResponseEntity<?> insertBoardgames() throws Exception {
        boardGameService.insertAllGames();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/video/{gameId}")
    public ResponseEntity<?> updateVideo(@PathVariable int gameId, @RequestBody Map<String, String> videoMap){
        if(boardGameService.updateVideo(gameId, videoMap.get("video")))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Scheduled(cron = "0 0/1 * * * *")
    public void checkReviewCount(){
        if(reviewCount.get() >= 100){
            reviewCount.set(0);
            boardGameService.sendResetRequest();
        }
    }
}
