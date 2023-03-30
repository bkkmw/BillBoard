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

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardGameServiceImpl implements BoardGameService{
    @PersistenceContext
    private EntityManager entityManager;
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
    //보드게임 조건 조회
    @Override
    public List<BoardGameDto.BoardGame> getBoardGameCondition() {
        List<BoardGame> boardgamesEntity = boardGameRepository.findTop10ByOrderByBoardgamerankDesc();

        List<BoardGameDto.BoardGame> boardgames = new ArrayList<>();
        for (BoardGame bg: boardgamesEntity) {
            BoardGameDto.BoardGame bgt = buildBoardGame(bg);
            boardgames.add(bgt);
        }
        return boardgames;
    }

    @Override
    public List<BoardGameDto.BoardGame> getBoardGameDynamic1(BoardGameDto.BoardGameDetail boardGameDetail) {
        String name = boardGameDetail.getName();
        int maxplaytime = boardGameDetail.getMaxplaytime();
        int maxplayers = boardGameDetail.getMaxplayers();
        double average = boardGameDetail.getAverage();
        double averageweight = boardGameDetail.getAverageweight();

        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            jpqlBuilder.append(" AND b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            jpqlBuilder.append(" AND b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.childrengamerank IS NOT NULL");
        }

        jpqlBuilder.append(" AND b.maxplaytime < :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers > :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average > :average");
        jpqlBuilder.append(" AND b.averageweight > :averageweight");

        jpqlBuilder.append(" ORDER BY b.boardgamerank  ASC");

        TypedQuery<BoardGame> query = entityManager.createQuery(jpqlBuilder.toString(), BoardGame.class);
        query.setMaxResults(20);
        if(name != null && !name.isEmpty()) {
            query.setParameter("name", "%" + name + "%");
        }

        query.setParameter("maxplaytime", maxplaytime);
        query.setParameter("maxplayers", maxplayers);
        query.setParameter("average", average);
        query.setParameter("averageweight", averageweight);



        List<BoardGame> boardgamesEntity = query.getResultList();
        List<BoardGameDto.BoardGame> boardgames = new ArrayList<>();
        for (BoardGame bg: boardgamesEntity) {
            BoardGameDto.BoardGame bgt = buildBoardGame(bg);
        boardgames.add(bgt);
        }
        return boardgames;

    }

    @Override
    public List<BoardGameDto.BoardGame> getBoardGameDynamic2(BoardGameDto.BoardGameDetail boardGameDetail) {
        String name = boardGameDetail.getName();
        int maxplaytime = boardGameDetail.getMaxplaytime();
        int maxplayers = boardGameDetail.getMaxplayers();
        double average = boardGameDetail.getAverage();
        double averageweight = boardGameDetail.getAverageweight();

        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            jpqlBuilder.append(" AND b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            jpqlBuilder.append(" AND b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.childrengamerank IS NOT NULL");
        }

        jpqlBuilder.append(" AND b.maxplaytime < :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers > :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average > :average");
        jpqlBuilder.append(" AND b.averageweight > :averageweight");

        jpqlBuilder.append(" ORDER BY b.average  DESC");

        TypedQuery<BoardGame> query = entityManager.createQuery(jpqlBuilder.toString(), BoardGame.class);
        query.setMaxResults(20);
        if(name != null && !name.isEmpty()) {
            query.setParameter("name", "%" + name + "%");
        }

        query.setParameter("maxplaytime", maxplaytime);
        query.setParameter("maxplayers", maxplayers);
        query.setParameter("average", average);
        query.setParameter("averageweight", averageweight);



        List<BoardGame> boardgamesEntity = query.getResultList();
        List<BoardGameDto.BoardGame> boardgames = new ArrayList<>();
        for (BoardGame bg: boardgamesEntity) {
            BoardGameDto.BoardGame bgt = buildBoardGame(bg);
            boardgames.add(bgt);
        }
        return boardgames;

    }

    @Override
    public List<BoardGameDto.BoardGame> getBoardGameDynamic3(BoardGameDto.BoardGameDetail boardGameDetail) {
        String name = boardGameDetail.getName();
        int maxplaytime = boardGameDetail.getMaxplaytime();
        int maxplayers = boardGameDetail.getMaxplayers();
        double average = boardGameDetail.getAverage();
        double averageweight = boardGameDetail.getAverageweight();

        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            jpqlBuilder.append(" AND b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            jpqlBuilder.append(" AND b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.childrengamerank IS NOT NULL");
        }

        jpqlBuilder.append(" AND b.maxplaytime < :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers > :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average > :average");
        jpqlBuilder.append(" AND b.averageweight > :averageweight");

        jpqlBuilder.append(" ORDER BY b.yearpublished  DESC");

        TypedQuery<BoardGame> query = entityManager.createQuery(jpqlBuilder.toString(), BoardGame.class);
        query.setMaxResults(20);
        if(name != null && !name.isEmpty()) {
            query.setParameter("name", "%" + name + "%");
        }

        query.setParameter("maxplaytime", maxplaytime);
        query.setParameter("maxplayers", maxplayers);
        query.setParameter("average", average);
        query.setParameter("averageweight", averageweight);



        List<BoardGame> boardgamesEntity = query.getResultList();
        List<BoardGameDto.BoardGame> boardgames = new ArrayList<>();
        for (BoardGame bg: boardgamesEntity) {
            BoardGameDto.BoardGame bgt = buildBoardGame(bg);
            boardgames.add(bgt);
        }
        return boardgames;

    }

    @Override
    public List<BoardGameDto.BoardGame> getBoardGameDynamic4(BoardGameDto.BoardGameDetail boardGameDetail) {
        String name = boardGameDetail.getName();
        int maxplaytime = boardGameDetail.getMaxplaytime();
        int maxplayers = boardGameDetail.getMaxplayers();
        double average = boardGameDetail.getAverage();
        double averageweight = boardGameDetail.getAverageweight();

        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            jpqlBuilder.append(" AND b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            jpqlBuilder.append(" AND b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.childrengamerank IS NOT NULL");
        }

        jpqlBuilder.append(" AND b.maxplaytime < :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers > :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average > :average");
        jpqlBuilder.append(" AND b.averageweight > :averageweight");

        jpqlBuilder.append(" ORDER BY b.averageweight DESC");

        TypedQuery<BoardGame> query = entityManager.createQuery(jpqlBuilder.toString(), BoardGame.class);
        query.setMaxResults(20);
        if(name != null && !name.isEmpty()) {
            query.setParameter("name", "%" + name + "%");
        }

        query.setParameter("maxplaytime", maxplaytime);
        query.setParameter("maxplayers", maxplayers);
        query.setParameter("average", average);
        query.setParameter("averageweight", averageweight);



        List<BoardGame> boardgamesEntity = query.getResultList();
        List<BoardGameDto.BoardGame> boardgames = new ArrayList<>();
        for (BoardGame bg: boardgamesEntity) {
            BoardGameDto.BoardGame bgt = buildBoardGame(bg);
            boardgames.add(bgt);
        }
        return boardgames;

    }

    @Override
    public List<BoardGameDto.BoardGame> getBoardGameDynamic5(BoardGameDto.BoardGameDetail boardGameDetail) {
        String name = boardGameDetail.getName();
        int maxplaytime = boardGameDetail.getMaxplaytime();
        int maxplayers = boardGameDetail.getMaxplayers();
        double average = boardGameDetail.getAverage();
        double averageweight = boardGameDetail.getAverageweight();

        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            jpqlBuilder.append(" AND b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            jpqlBuilder.append(" AND b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            jpqlBuilder.append(" AND b.childrengamerank IS NOT NULL");
        }

        jpqlBuilder.append(" AND b.maxplaytime < :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers > :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average > :average");
        jpqlBuilder.append(" AND b.averageweight > :averageweight");

        jpqlBuilder.append(" ORDER BY b.usersrated DESC");

        TypedQuery<BoardGame> query = entityManager.createQuery(jpqlBuilder.toString(), BoardGame.class);
        query.setMaxResults(20);
        if(name != null && !name.isEmpty()) {
            query.setParameter("name", "%" + name + "%");
        }

        query.setParameter("maxplaytime", maxplaytime);
        query.setParameter("maxplayers", maxplayers);
        query.setParameter("average", average);
        query.setParameter("averageweight", averageweight);



        List<BoardGame> boardgamesEntity = query.getResultList();
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


        if(userRepository.existsByUserId(userId) && boardGameRepository.existsById(gameId)){
            Favorite fav = Favorite.builder()
                    .gameId(gameId)
                    .userId(userId)
                    .build();
            favoriteRepository.save(fav);
            return true;
        }
        return false;
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
        //리뷰 등록하면 보드게임 db에 수정이 필요하다
       String userId = reviewDto.getUserId();
       int gameId = reviewDto.getGameId();
        if(userRepository.existsByUserId(userId) && boardGameRepository.existsById(gameId)){
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


        return false;
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
                .name(bg.getName())
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