package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.HistoryDto;
import com.ssafy.billboard.model.service.HistoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/history")
@Tag(name="[History] History API")
@Slf4j
@RequiredArgsConstructor
public class HistoryController {

    private final Logger logger = LoggerFactory.getLogger(HistoryController.class);

    private final HistoryService historyService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserHistory(@PathVariable("userId") String userId) {
        HttpStatus status;

        status = HttpStatus.OK;
        Map<String, Object> resultMap = new HashMap<>();
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
