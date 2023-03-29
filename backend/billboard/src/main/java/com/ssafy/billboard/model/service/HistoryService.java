package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.HistoryDto;
import com.ssafy.billboard.model.entity.History;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HistoryService {
    List<HistoryDto.HistoryInfoDto> findUserHistory(String userId, Pageable pageable);

    int createHistory(HistoryDto.HistoryInputDto historyInputDto);
}
