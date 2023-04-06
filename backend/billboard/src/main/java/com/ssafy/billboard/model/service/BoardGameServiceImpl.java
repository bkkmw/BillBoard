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
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.io.BufferedReader;
import java.io.InputStreamReader;
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
        boolean isChecked = false;
        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        jpqlBuilder.append(" AND b.maxplaytime <= :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers >= :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average >= :average");
        jpqlBuilder.append(" AND b.averageweight >= :averageweight");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }

            jpqlBuilder.append(" b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.childrengamerank IS NOT NULL");
        }

        if(isChecked)
            jpqlBuilder.append(" ) ");

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
        boolean isChecked = false;
        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        jpqlBuilder.append(" AND b.maxplaytime <= :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers >= :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average >= :average");
        jpqlBuilder.append(" AND b.averageweight >= :averageweight");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }

            jpqlBuilder.append(" b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.childrengamerank IS NOT NULL");
        }

        if(isChecked)
            jpqlBuilder.append(" ) ");

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
        boolean isChecked = false;
        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        jpqlBuilder.append(" AND b.maxplaytime <= :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers >= :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average >= :average");
        jpqlBuilder.append(" AND b.averageweight >= :averageweight");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }

            jpqlBuilder.append(" b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.childrengamerank IS NOT NULL");
        }

        if(isChecked)
            jpqlBuilder.append(" ) ");

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
        boolean isChecked = false;
        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        jpqlBuilder.append(" AND b.maxplaytime <= :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers >= :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average >= :average");
        jpqlBuilder.append(" AND b.averageweight >= :averageweight");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }

            jpqlBuilder.append(" b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.childrengamerank IS NOT NULL");
        }

        if(isChecked)
            jpqlBuilder.append(" ) ");

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
        boolean isChecked = false;
        String strategygamerank = boardGameDetail.getStrategygamerank();
        String familygamerank = boardGameDetail.getFamilygamerank();
        String partygamerank = boardGameDetail.getPartygamerank();
        String abstractgamerank = boardGameDetail.getAbstractgamerank();
        String thematicrank = boardGameDetail.getThematicrank();
        String wargamerank = boardGameDetail.getWargamerank();
        String customizablerank = boardGameDetail.getCustomizablerank();
        String childrengamerank = boardGameDetail.getChildrengamerank();




        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        jpqlBuilder.append(" AND b.maxplaytime <= :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers >= :maxplayers"); // 같다?
        jpqlBuilder.append(" AND b.average >= :average");
        jpqlBuilder.append(" AND b.averageweight >= :averageweight");
        if(name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        if(strategygamerank != null && !strategygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }

            jpqlBuilder.append(" b.strategygamerank IS NOT NULL");
        }
        if(familygamerank != null && !familygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.familygamerank IS NOT NULL");
        }
        if(partygamerank != null && !partygamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.partygamerank IS NOT NULL");
        }
        if(abstractgamerank != null && !abstractgamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.abstractgamerank IS NOT NULL");
        }
        if(thematicrank != null && !thematicrank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.thematicrank IS NOT NULL");
        }
        if(wargamerank != null && !wargamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.wargamerank IS NOT NULL");
        }
        if(customizablerank != null && !customizablerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.customizablerank IS NOT NULL");
        }
        if(childrengamerank != null && !childrengamerank.isEmpty()) {
            if(isChecked){
                jpqlBuilder.append(" OR ");
            } else {
                isChecked = true;
                jpqlBuilder.append(" AND ( ");
            }
            jpqlBuilder.append(" b.childrengamerank IS NOT NULL");
        }

        if(isChecked)
            jpqlBuilder.append(" ) ");

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
    public List<BoardGameDto.BoardGame> getFavoriteBoardGames(String userId) {
        if(!userRepository.existsByUserId(userId))
            return null;


        List<Favorite> favoritesEntity = favoriteRepository.findAllByUserId(userId);
        List<BoardGameDto.BoardGame> boardgames = new ArrayList<>();
        for (Favorite fv: favoritesEntity) {
            int gameId = fv.getGameId();
            BoardGame bg = boardGameRepository.findById(gameId).get();
            BoardGameDto.BoardGame bgt = buildBoardGame(bg);
            boardgames.add(bgt);

        }
       return boardgames;
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
                .video(bg.getVideo())
                .build();
        return bgt;
    }

    @Override
    public void insertAllGames() throws Exception {
        ClassPathResource resource = new ClassPathResource("boardgameInfo.csv");
        BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));

        List<BoardGame> games = new ArrayList<>();
        String s = "";
        br.readLine();
        while((s = br.readLine()) != null){
            String[] line = s.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1);
            if(line[13].equals("Not Ranked"))
                continue;
            games.add(BoardGame.builder()
                    .gameId(Integer.parseInt(line[0]))
                    .name(line[1])
                    .thumbnail(line[2])
                    .image(line[3])
                    .description(line[4].substring(1, line[4].length() - 1))
                    .yearpublished(Integer.parseInt(line[5]))
                    .minplayers(Integer.parseInt(line[6]))
                    .maxplayers(Integer.parseInt(line[7]))
                    .minplaytime(Integer.parseInt(line[8]))
                    .maxplaytime(Integer.parseInt(line[9]))
                    .minage(Integer.parseInt(line[10]))
                    .usersrated(Integer.parseInt(line[11]))
                    .average(Double.parseDouble(line[12]))
                    .boardgamerank(Integer.parseInt(line[13]))
                    .numweights(Integer.parseInt(line[14]))
                    .averageweight(Double.parseDouble(line[15]))
                    .strategygamerank(line[16].equals("") ? null : line[16])
                    .familygamerank(line[17].equals("") ? null : line[17])
                    .partygamerank(line[18].equals("") ? null : line[18])
                    .abstractgamerank(line[19].equals("") ? null : line[19])
                    .thematicrank(line[20].equals("") ? null : line[20])
                    .wargamerank(line[21].equals("") ? null : line[21])
                    .customizablerank(line[22].equals("") ? null : line[22])
                    .childrengamerank(line[23].equals("") ? null : line[23])
                    .build());
        }
        boardGameRepository.saveAll(games);
    }

    public List<BoardGameDto.BoardGameInfo> getBoardGameListByIds(Integer[] ids){
        List<BoardGameDto.BoardGameInfo> games = new ArrayList<>();
        for(int id : ids){
            BoardGame boardGame = boardGameRepository.findById(id).get();
            games.add(new BoardGameDto.BoardGameInfo().builder()
                    .gameId(boardGame.getGameId())
                    .name(boardGame.getName())
                    .image(boardGame.getImage())
                    .build());
        }

        return games;
    }

    public boolean updateVideo(int gameId, String video){
        if(!boardGameRepository.existsById(gameId))
            return false;
        BoardGame boardGame = boardGameRepository.findById(gameId).get();
        boardGame.updateVideo(video);
        boardGameRepository.save(boardGame);
        return true;
    }
    //StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
    public List<BoardGame> makeQuery(String[] str,String[] value,String name,int maxplaytime,int maxplayers,
                                     double average,double averageweight) {
        boolean isChecked = false;
        StringBuilder jpqlBuilder = new StringBuilder("SELECT b FROM BoardGame b WHERE 1=1");
        jpqlBuilder.append(" AND b.maxplaytime <= :maxplaytime");
        jpqlBuilder.append(" AND b.maxplayers >= :maxplayers");
        jpqlBuilder.append(" AND b.average <= :average");
        jpqlBuilder.append(" AND b.averageweight >= :averageweight");
        if (name != null && !name.isEmpty()) {
            jpqlBuilder.append(" AND b.name LIKE :name");
        }

        for (int i = 0; i < 8; i++) {
            String genre = str[i];
            String v = value[i];

            if (genre != null && !genre.isEmpty()) {
                if (isChecked) {
                    jpqlBuilder.append(" OR ");
                } else {
                    isChecked = true;
                    jpqlBuilder.append(" AND ( ");
                }

                jpqlBuilder.append(" b.");
                jpqlBuilder.append(v);
                jpqlBuilder.append(" IS NOT NULL ");
            }
        }
        if(isChecked)
        jpqlBuilder.append(" ) ");
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
        String jpqlQuery = query.unwrap(org.hibernate.query.Query.class).getQueryString();
        System.out.println(jpqlQuery);


        List<BoardGame> boardgamesEntity = query.getResultList();
        System.out.println(boardgamesEntity.size());
        return boardgamesEntity;
    }

}
