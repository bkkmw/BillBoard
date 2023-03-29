package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.HistoryDto;
import com.ssafy.billboard.model.entity.BoardGame;
import com.ssafy.billboard.model.entity.History;
import com.ssafy.billboard.model.entity.User;
import com.ssafy.billboard.model.repository.BoardGameRepository;
import com.ssafy.billboard.model.repository.HistoryRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.NameNotFoundException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryServiceImpl implements  HistoryService{

    private final Logger logger = LoggerFactory.getLogger(HistoryServiceImpl.class);
    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final BoardGameRepository boardGameRepository;

    @Override
    public List<HistoryDto.HistoryInfoDto> findUserHistory(String userId, Pageable pageable) {
        logger.debug("Find top 10 history");

        if(!userRepository.existsByUserId(userId)) return null;
        List<History> histories = historyRepository.findByUserId(userId, pageable);
        List<HistoryDto.HistoryInfoDto> ret = new ArrayList<>(pageable.getPageSize());

        histories.forEach(history -> {
            ret.add(HistoryDto.HistoryInfoDto.builder()
                            .gameId(history.getBoardGame().getGameId())
                            .lastPlayedTime(history.getUpdatedTime())
                            .playedCnt(history.getCount())
                    .build());
        });
        return ret;
    }

    /*
    returns : 0(Success), -1(Not found), -2(Bad Request)
     */
    @Override
    @Transactional
    public int createHistory(HistoryDto.HistoryInputDto historyInputDto) {
        logger.debug("Create history");
        // Logics for game Id
        int gameId = historyInputDto.getGameId();
        if(!boardGameRepository.existsById(gameId)) return -2;
        BoardGame boardGame = boardGameRepository.findById(gameId).get();

        logger.debug("board game : {}, {}", boardGame.getGameId(), boardGame.getName());

        // logics for user
        List<String> winnerList = historyInputDto.getWinners();
        List<String> userList = historyInputDto.getUsers();

        if((userList == null || userList.size() < 1)
            && (winnerList == null || winnerList.size() < 1)) return -2;

        try {
            if(userList != null && userList.size() > 0) {
                userList.forEach(userId -> {
                    createHistory(userId, boardGame, false, historyInputDto.getPlayTime());
                });
            }

            if(winnerList != null && winnerList.size() > 0) {
                winnerList.forEach(userId -> {
                    createHistory(userId, boardGame, true, historyInputDto.getPlayTime());
                });
           }

        } catch(Exception e) {
            e.printStackTrace();
            return -1;
        }
        return 0;
    }

    /**
     * method to create history by isWin as arg
     * @param userId
     * @param boardGame
     * @param isWin
     */
    private void createHistory(String userId, BoardGame boardGame, boolean isWin, int playTime) {
        History history = historyRepository.findByUserIdAndBoardGameGameId(userId, boardGame.getGameId());

        if(history == null){
            logger.debug("no history found");
            history = History.builder()
                    .userId(userId)
                    .boardGame(boardGame)
                    .count(1)
                    .build();
        }
        else {
            logger.debug("history found : {}", history.getBoardGame());
            history.updateCount();
        }

        User user = userRepository.findByUserId(userId);
        if(user == null) return;
        user.updateCount(isWin, playTime);
        userRepository.save(user);

        historyRepository.save(history);
    }
}
