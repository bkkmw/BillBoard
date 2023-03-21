package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.UserDto;
import com.ssafy.billboard.model.dto.UserInfoDto;
import com.ssafy.billboard.model.dto.UserLoginDto;
import com.ssafy.billboard.model.dto.UserSignUpDto;
import com.ssafy.billboard.model.entity.User;
import com.ssafy.billboard.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public int signup(UserSignUpDto userSignUpDto) {
        logger.trace("user SignUp : {}", userSignUpDto);


        if(userRepository.findByUserId(userSignUpDto.getUserId()) == null){
            logger.trace("{} user not found", userSignUpDto.getUserId());

            String encode = passwordEncoder.encode(userSignUpDto.getPassword());
            logger.info(encode);

            userSignUpDto.setPassword(encode);
            userRepository.save(new User.UserBuilder(userSignUpDto).build());
            return 1;
        }

        logger.info("{} user already exists", userSignUpDto.getUserId());
        return 0;
    }

    @Override
    public UserInfoDto getUserInfo(String userId) {
        logger.trace("find user : {}", userId);
        User user = userRepository.findByUserId(userId);

        if(user == null) return null;

        return UserInfoDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .experience(user.getExperience())
                .matchCount(user.getMatchCount())
                .winCount(user.getWinCount())
                .build();
    }

    // TBD ...
    @Override
    public int modifyUserInfo(UserSignUpDto userSignUpDto) {
        logger.trace("modify user : {}", userSignUpDto);

        return 0;
    }

    @Override
    public int deleteUser(String userId){
        logger.trace("delete user : {}", userId);

        User user = userRepository.findByUserId(userId);

        if(user == null) return 0;

        userRepository.delete(userRepository.findByUserId(userId));
        return 1;
    }

    @Override
    // return type will be changed after implementing token
    public UserInfoDto login(UserLoginDto userLoginDto) {
        logger.trace("login : {} , {}", userLoginDto.getUserId(), userLoginDto.getPassword());

        User user = userRepository.findByUserId(userLoginDto.getUserId());

        if(user != null && passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            logger.info("Password matched");
            // create toekns & insert RT at DB
            // modify state to on-line
            user.updateOnLogin("AA");

            userRepository.save(user);
            return UserInfoDto.builder()
                    .nickname(user.getNickname())
                    .build();
        }

        logger.debug("FAILED TO LOGIN");
        return null;
    }

    public int logout(String userId) {
        logger.trace("logout : {}", userId);

        User user = userRepository.findByUserId(userId);

        if(user != null) {
            logger.trace("user found, do logout");
            user.updateOnLogout();

            userRepository.save(user);
            return 1;
        }

        return 0;
    }
}
