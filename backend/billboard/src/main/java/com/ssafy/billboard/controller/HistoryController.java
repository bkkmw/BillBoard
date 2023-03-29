package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.HistoryDto;
import com.ssafy.billboard.model.service.HistoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/histories")
@Tag(name="[History] History API")
@Slf4j
@RequiredArgsConstructor
public class HistoryController {

    private final Logger logger = LoggerFactory.getLogger(HistoryController.class);

    private final HistoryService historyService;

    @GetMapping("/user")
    public ResponseEntity<?> getUserHistory(
            @RequestParam String userId,
            @PageableDefault(size = 10, sort = "count", direction = Sort.Direction.DESC) Pageable pageable) {
        HttpStatus status;

        logger.debug("Pageable : {}", pageable.getOffset());
        logger.debug("Pageable : {}", pageable.getPageNumber());
        logger.debug("userId : {}", userId);

        List<HistoryDto.HistoryInfoDto> list = historyService.findUserHistory(userId, pageable);

        logger.debug("history found : {}", list.size());

        status = (list.size() > 0) ? HttpStatus.OK : HttpStatus.NO_CONTENT;

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("history", list);

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PostMapping
    public ResponseEntity<?> createHistory(@RequestBody HistoryDto.HistoryInputDto historyInputDto) {
        HttpStatus status;

        int res = historyService.createHistory(historyInputDto);

        status = (res == 0) ? HttpStatus.OK
                : (res == -1) ? HttpStatus.NOT_FOUND
                : HttpStatus.BAD_REQUEST;

        return new ResponseEntity<Void>(status);
    }
}
