package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.FollowDto;
import com.ssafy.billboard.model.dto.LocationDto;
import com.ssafy.billboard.model.entity.DongCode;
import com.ssafy.billboard.model.entity.Follow;
import com.ssafy.billboard.model.entity.GugunCode;
import com.ssafy.billboard.model.entity.SidoCode;
import com.ssafy.billboard.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final SidoCodeRepository sidoCodeRepository;
    private final GugunCodeRepository gugunCodeRepository;
    private final DongCodeRepository dongCodeRepository;

    @Override
    public List<LocationDto.SidoCodeInfo> getSidoList(){
        List<SidoCode> sidoListEntity = sidoCodeRepository.findAll();
        List<LocationDto.SidoCodeInfo> sidoList = new ArrayList<>();
        for(SidoCode sido : sidoListEntity)
            sidoList.add(LocationDto.SidoCodeInfo.builder()
                    .sidoCode(sido.getSidoCode())
                    .sidoName(sido.getSidoName())
                    .build());
        return sidoList;
    }

    @Override
    public List<LocationDto.GugunCodeInfo> getGugunList(String sidoCode){
        int idx = sidoCode.indexOf("0");
        String gugunCode = sidoCode;
        if(idx > 0)
            gugunCode = sidoCode.substring(0, idx);
        List<GugunCode> gugunListEntity = gugunCodeRepository.findAllByGugunCodeStartsWith(gugunCode);
        List<LocationDto.GugunCodeInfo> gugunList = new ArrayList<>();
        for(GugunCode gugun : gugunListEntity)
            gugunList.add(LocationDto.GugunCodeInfo.builder()
                    .gugunCode(gugun.getGugunCode())
                    .gugunName(gugun.getGugunName())
                    .build());
        return gugunList;
    }

    @Override
    public List<LocationDto.DongCodeInfo> getDongList(String gugunCode){
        int idx = gugunCode.indexOf("0");
        String dongCode = gugunCode;
        if(idx > 0)
            dongCode = gugunCode.substring(0, idx);
        List<DongCode> dongListEntity = dongCodeRepository.findAllByDongCodeStartsWith(dongCode);
        List<LocationDto.DongCodeInfo> dongList = new ArrayList<>();
        for(DongCode dong : dongListEntity)
            dongList.add(LocationDto.DongCodeInfo.builder()
                    .dongCode(dong.getDongCode())
                    .dongName(dong.getDongName())
                    .build());
        return dongList;
    }
}
