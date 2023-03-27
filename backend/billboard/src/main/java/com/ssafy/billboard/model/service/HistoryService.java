package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.HistoryDto;
import com.ssafy.billboard.model.entity.History;

import java.util.List;

public interface HistoryService {
    List<History> findUserHistory(String userId);

    int createHistory(HistoryDto.HistoryInputDto historyInputDto);
}
