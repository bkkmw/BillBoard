package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.BoardGameDto;
import com.ssafy.billboard.model.dto.FavoriteDto;
import com.ssafy.billboard.model.dto.ReviewDto;
import com.ssafy.billboard.model.entity.*;
import com.ssafy.billboard.model.repository.BoardGameRepository;
import com.ssafy.billboard.model.repository.FavoriteRepository;
import com.ssafy.billboard.model.repository.ReviewRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardGameServiceImpl implements BoardGameService{

    private final BoardGameRepository boardGameRepository;
    private final ReviewRepository reviewRepository;
    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    //보드게임 목록 조회
    @Override
    public List<BoardGameDto.BoardGame> getBoardGameList() {
        List<BoardGame> boardgamesEntity = boardGameRepository.findAll();
        List<BoardGameDto.BoardGame> boardgames = new ArrayList<>();
        for (BoardGame bg: boardgamesEntity) {
            BoardGameDto.BoardGame bgt = buildBoardGame(bg);
            boardgames.add(bgt);
        }
        return boardgames;
    }

    //보드게임 상세 조회
    @Override
    public BoardGameDto.BoardGame getBoardGameDetail(int gameId) {
        if(!boardGameRepository.existsById(gameId)){
            return null;
        }

        BoardGame bg = boardGameRepository.findById(gameId).get();
        BoardGameDto.BoardGame bgt = buildBoardGame(bg);
        return bgt;
    }
    //보드게임 즐겨찾기 등록
    @Override
    public boolean addFavoriteBoardGame(String userId, int gameId) {
    //requestbody : gameId



        favoriteRepository.save(Favorite.builder()
                .gameId(gameId)
                .userId(userId)
                .build()
        );

        return true;


    }
    //보드게임 즐겨찾기 조회
    @Override
    public List<FavoriteDto.Favorite> getFavoriteBoardGames(String userId) {
        if(!userRepository.existsByUserId(userId))
            return null;


        List<Favorite> favoritesEntity = favoriteRepository.findAllByUserId(userId);
        List<FavoriteDto.Favorite> favorites = new ArrayList<>();

        for (Favorite fv: favoritesEntity) {
            FavoriteDto.Favorite fvd = FavoriteDto.Favorite.builder()
                    .gameId(fv.getGameId())
                    .userId(fv.getUserId())
                    .build();
            favorites.add(fvd);
        }
       return favorites;
    }
    //보드게임 즐겨찾기 해제
    @Override
    public boolean removeFavoriteBoardGame(FavoriteID favoriteID) {

       if(favoriteRepository.existsById(favoriteID)){
           favoriteRepository.delete(Favorite.builder()
                   .userId(favoriteID.getUserId())
                   .gameId(favoriteID.getGameId())
                   .build()
           );
           return true;
       }
        return false; //현재 false 리턴 안되는 오류
    }
    //리뷰 등록
    @Override
    public boolean addBoardGameReview(ReviewDto.Review reviewDto) {
        System.out.println("reviewDto====");
        reviewRepository.save(Review.builder()
                        .gameId(reviewDto.getGameId())
                        .name(reviewDto.getName())
                        .rating(reviewDto.getRating())
                        .userId(reviewDto.getUserId())
                        .comment(reviewDto.getComment())
                .build()

        );

        return true;
    }
    //리뷰 조회
    @Override
    public List<ReviewDto.Review> getBoardGameReviewsGameId(int gameId) {
        if(!boardGameRepository.existsById(gameId))
            return null;

        List<Review> reviewsEntity = reviewRepository.findAllByGameId(gameId);
        List<ReviewDto.Review> reviews =  getReviews(reviewsEntity);
        return reviews;
    }
    //유저별 리뷰 조회
    @Override
    public List<ReviewDto.Review> getBoardGameReviewsUserId(String userId) {
        if(!userRepository.existsByUserId(userId))
            return null;

        List<Review> reviewsEntity = reviewRepository.findAllByUserId(userId);
        List<ReviewDto.Review> reviews =  getReviews(reviewsEntity);
        return reviews;
    }
    //리뷰 삭제
    @Override
    public int removeBoardGimeReview(ReviewDto.ReviewID reviewDtoID) {
        ReviewID reviewID = new ReviewID(reviewDtoID.getGameId(),reviewDtoID.getUserId());
        if(!userRepository.existsByUserId(reviewDtoID.getUserId()))
            return -1; //유저 없음


        if(reviewRepository.existsById(reviewID)){
            reviewRepository.delete(Review.builder()
                    .gameId(reviewID.getGameId())
                    .userId(reviewID.getUserId())
                    .build()
            );
            return 1; //리뷰 지움
        }
        return 0; //리뷰 없음
    }


    //Review -> ReviewDto
    private List<ReviewDto.Review> getReviews(List<Review> reviewsEntity) {
        List<ReviewDto.Review> reviews = new ArrayList<>();
        for (Review rv: reviewsEntity) {
            ReviewDto.Review rvd = ReviewDto.Review.builder()
                    .gameId(rv.getGameId())
                    .name(rv.getName())
                    .rating(rv.getRating())
                    .userId(rv.getUserId())
                    .comment(rv.getComment())
                    .build();
            reviews.add(rvd);
        }
        return reviews;
    }

   //BoardGame ->BoardGameDto
    private BoardGameDto.BoardGame buildBoardGame(BoardGame bg) {
        BoardGameDto.BoardGame  bgt = BoardGameDto.BoardGame.builder()
                .gameId(bg.getGameId())
                .average(bg.getAverage())
                .abstractgamerank(bg.getAbstractgamerank())
                .averageweight(bg.getAverageweight())
                .image(bg.getImage())
                .childrengamerank(bg.getChildrengamerank())
                .customizablerank(bg.getCustomizablerank())
                .boardgamerank(bg.getBoardgamerank())
                .familygamerank(bg.getFamilygamerank())
                .maxplayers(bg.getMaxplayers()) //10
                .minage(bg.getMinage())
                .description(bg.getDescription())
                .minplayers(bg.getMinplayers())
                .maxplaytime(bg.getMaxplaytime())
                .minplaytime(bg.getMinplaytime())
                .numweights(bg.getNumweights())
                .partygamerank(bg.getPartygamerank())
                .primary(bg.getPrimary())
                .strategygamerank(bg.getStrategygamerank())
                .thematicrank(bg.getThematicrank()) //20
                .thumbnail(bg.getThumbnail())
                .usersrated(bg.getUsersrated())
                .wargamerank(bg.getWargamerank())
                .yearpublished(bg.getYearpublished())
                .build();
        return bgt;
    }
}
