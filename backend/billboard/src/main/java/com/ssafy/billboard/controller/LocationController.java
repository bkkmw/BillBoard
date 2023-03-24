package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.LocationDto;
import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.service.LocationService;
import com.ssafy.billboard.model.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/sido")
    public ResponseEntity<?> getSidoList(){
        Map<String, Object> resultMap = new HashMap<>();
        List<LocationDto.SidoCodeInfo> sidoList = locationService.getSidoList();
        resultMap.put("sidoList", sidoList);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/gugun/{sidoCode}")
    public ResponseEntity<?> getGugunList(@PathVariable String sidoCode){
        Map<String, Object> resultMap = new HashMap<>();
        List<LocationDto.GugunCodeInfo> gugunList = locationService.getGugunList(sidoCode);
        if(gugunList.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("gugunList", gugunList);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/dong/{gugunCode}")
    public ResponseEntity<?> getDongList(@PathVariable String gugunCode){
        Map<String, Object> resultMap = new HashMap<>();
        List<LocationDto.DongCodeInfo> dongList = locationService.getDongList(gugunCode);
        if(dongList.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("dongList", dongList);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/coordinate/{dongCode}")
    public ResponseEntity<?> getCoordinate(@PathVariable String dongCode){
        Map<String, Object> resultMap = new HashMap<>();
        LocationDto.Coordinate coordinate = locationService.getCoordinate(dongCode);
        if(coordinate == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        resultMap.put("coordinate", coordinate);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
