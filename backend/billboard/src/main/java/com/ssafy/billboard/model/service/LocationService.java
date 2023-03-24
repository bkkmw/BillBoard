package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.FollowDto;
import com.ssafy.billboard.model.dto.LocationDto;

import java.util.List;

public interface LocationService {
    public List<LocationDto.SidoCodeInfo> getSidoList();
    public List<LocationDto.GugunCodeInfo> getGugunList(String sidoCode);
    public List<LocationDto.DongCodeInfo> getDongList(String gugunCode);
    public LocationDto.Coordinate getCoordinate(String dongCode);
}
