package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.BoardGameDto;
import com.ssafy.billboard.model.dto.FavoriteDto;
import com.ssafy.billboard.model.entity.BoardGame;
import com.ssafy.billboard.model.entity.Favorite;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.repository.BoardGameRepository;
import com.ssafy.billboard.model.repository.FavoriteRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardGameServiceImpl implements BoardGameService{

    private final BoardGameRepository boardGameRepository;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    //보드게임 목록 조회
    @Override
    public List<BoardGameDto.BoardGame> getBoardGameList() {
        List<BoardGame> boardgamesEntity = boardGameRepository.findAll();
        List<BoardGameDto.BoardGame> boardgames = new ArrayList<>();
        for (BoardGame bg: boardgamesEntity) {
            BoardGameDto.BoardGame  bgt = BoardGameDto.BoardGame.builder()
                    .gameId(bg.getGameId())
                    .build();
            boardgames.add(bgt);
        }
        return boardgames;
    }
    //보드게임 상세 조회
    @Override
    public BoardGameDto.BoardGame getBoardGameDetail(long gameId) {
        BoardGame bg = boardGameRepository.findById(gameId).get();
        BoardGameDto.BoardGame bgt = BoardGameDto.BoardGame.builder()
                .gameId(bg.getGameId())
                .build();
        return bgt;
    }
    //보드게임 즐겨찾기 등록
    @Override
    public boolean addFavoriteBoardGame(String userId, @RequestBody long gameId) {
    //requestbody : gameId



        return false;
    }
    //보드게임 즐겨찾기 조회
    @Override
    public List<FavoriteDto.Favorite> getFavoriteBoardGames(String userId) {
        List<Favorite> bgl = favoriteRepository.findAllById(Collections.singleton(userId));
        List<FavoriteDto.Favorite> favorites = new ArrayList<>();

        for(Favorite favor : bgl){
            FavoriteDto.Favorite favorDto = FavoriteDto.Favorite.builder()
                    .userId(favor.getUserId())
                    .gameId(favor.getGameId())
                    .build();
            favorites.add(favorDto);
        }

       return favorites;
    }

    @Override
    public boolean removeFavoriteBoardGame(String userId, long gameId) {
        favoriteRepository.deleteById(userId);

        return false;
    }
}
