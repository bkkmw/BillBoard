package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.HistoryDto;
import com.ssafy.billboard.model.entity.History;
import com.ssafy.billboard.model.entity.User;
import com.ssafy.billboard.model.repository.HistoryRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryServiceImpl implements  HistoryService{

    private final Logger logger = LoggerFactory.getLogger(HistoryServiceImpl.class);
    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;

    @Override
    public List<History> findUserHistory(String userId) {
        return null;
    }

    /*
    returns : 0(Success), -1(Not found), -2(Bad Request)
     */
    @Override
    @Transactional
    public int createHistory(HistoryDto.HistoryInputDto historyInputDto) {
        // Logics for game Id
        int gameId = historyInputDto.getGameId();
        // logics for user
        List<String> winnerList = historyInputDto.getWinners();
        List<String> userList = historyInputDto.getUsers();
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());

        if(userList == null || userList.size() < 1) return -2;

        try {
            if(userList != null && userList.size() > 0) {
                userList.forEach(userId -> {
                    createHistory(userId, gameId, currentTime, false);
                });
            }

            if(winnerList != null && winnerList.size() > 0) {
                winnerList.forEach(userId -> {
                    createHistory(userId, gameId, currentTime, true);
                });
           }

        } catch(Exception e) {
            e.printStackTrace();
            return -1;
        }
        return 0;
    }

    private void createHistory(String userId, int gameId, Timestamp currentTime, boolean isWin) {
        History history = historyRepository.findByUserIdAndGameId(userId, gameId);

        if(history == null){
            history = History.builder()
                    .userId(userId)
                    .gameId(gameId)
                    .count(0)
                    .lastPlayTime(currentTime)
                    .build();
        }
        else {
            history.update(currentTime);
        }

        User user = userRepository.findByUserId(userId);
        user.updateCount(isWin);
        userRepository.save(user);

        historyRepository.save(history);
    }
}
