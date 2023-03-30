package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.HistoryDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HistoryService {
    List<HistoryDto.HistoryInfoDto> findUserHistory(String userId, Pageable pageable);

    /**
     * create history both for win / lose
     * @param historyInputDto
     * @return -2 for insufficient info, -1 for incorrect info, 0 for success
     */
    int createHistory(HistoryDto.HistoryInputDto historyInputDto);
}
