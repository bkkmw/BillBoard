package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.BoardGameDto;
import com.ssafy.billboard.model.dto.MailDto;
import com.ssafy.billboard.model.dto.UserDto;
import com.ssafy.billboard.model.entity.Follow;
import com.ssafy.billboard.model.entity.History;
import com.ssafy.billboard.model.entity.MailAuth;
import com.ssafy.billboard.model.entity.User;
import com.ssafy.billboard.model.repository.FollowRepository;
import com.ssafy.billboard.model.repository.HistoryRepository;
import com.ssafy.billboard.model.repository.MailAuthRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import com.ssafy.billboard.security.JwtTokenProvider;
import com.ssafy.billboard.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final MailAuthRepository mailAuthRepository;
    private final FollowRepository followRepository;
    private final HistoryRepository historyRepository;
    private final MailService mailService;
    @Override
    public int signup(UserDto.UserSignUpDto userSignUpDto) {
        logger.trace("user SignUp : {}", userSignUpDto);

        if(userSignUpDto.getUserId() == null || userSignUpDto.getPassword() == null
            || userSignUpDto.getNickname() == null || userSignUpDto.getPassword() == null)
            return -2;

        if(!userRepository.existsByUserId(userSignUpDto.getUserId())){
            logger.trace("{} user not found", userSignUpDto.getUserId());

            if(userRepository.existsByEmail(userSignUpDto.getEmail())) return -1;
            // for test
            if(mailAuthRepository.existsById(userSignUpDto.getEmail()) == false) {
                MailAuth mailAuth = mailAuthRepository.findById(userSignUpDto.getEmail()).get();
                if(mailAuth.getAuthorized() == false) {
                    logger.info("auth not found ... : {}", mailAuthRepository.existsById(userSignUpDto.getEmail()));
                    return -1;
                }
                else mailAuthRepository.delete(mailAuth);
            }

            userRepository.save(User.builder()
                            .userId(userSignUpDto.getUserId())
                            .password(passwordEncoder.encode(userSignUpDto.getPassword()))
                            .nickname(userSignUpDto.getNickname())
                            .email(userSignUpDto.getEmail())
                        .build());

            return 0;
        }
        logger.info("{} user already exists", userSignUpDto.getUserId());
        return -1;
    }

    @Override
    public UserDto.UserWithHistoryDto getUserInfo(String fromUserId, String toUserId) {
        logger.trace("find user : {}", fromUserId);
        User user = userRepository.findByUserId(toUserId);

        int isFollowing = 0;
        if(fromUserId.equals(toUserId))
            isFollowing = -1;
        else if(followRepository.existsByFromUserIdAndToUserId(fromUserId, toUserId))
            isFollowing = 1;

        List<Follow> followerList = followRepository.findAllByToUserId(toUserId);
        int followrCnt = (followerList == null) ? 0 : followerList.size();

        if(user == null) return null;

        UserDto.UserInfoDto userInfoDto = UserDto.UserInfoDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .experience(user.getExperience())
                .matchCount(user.getMatchCount())
                .winCount(user.getWinCount())
                .isFollowing(isFollowing)
                .followerCnt(followrCnt)
                .build();

        List<BoardGameDto.BoardGame> recentGames = new ArrayList<>(10);

        List<History> recentHistory = historyRepository.findTop10ByUserIdOrderByUpdatedTimeDesc(toUserId);
        recentHistory.forEach(history -> {
            recentGames.add(BoardGameDto.BoardGame.builder()
                            .gameId(history.getBoardGame().getGameId())
                            .name(history.getBoardGame().getName())
                            .image(history.getBoardGame().getImage())
                            // 뭐 더 필요하면 그 떄 추가하겠습니다
                    .build()
            );
        });

        return UserDto.UserWithHistoryDto.builder()
                .userInfoDto(userInfoDto)
                .recentGames(recentGames)
                .build();
    }

    // TBD ...
    @Override
    public int modifyUserInfo(UserDto.UserSignUpDto userSignUpDto) {
        logger.trace("modify user : {}", userSignUpDto);

        return 0;
    }

    @Override
    public int deleteUser(String userId){
        logger.trace("delete user : {}", userId);

        User user = userRepository.findByUserId(userId);

        if(user == null) return -1;

        userRepository.delete(userRepository.findByUserId(userId));
        return 0;
    }

    @Override
    public UserDto.UserWithTokenDto login(UserDto.UserLoginDto userLoginDto) {
        logger.trace("login : {} , {}", userLoginDto.getUserId(), userLoginDto.getPassword());

        User user = userRepository.findByUserId(userLoginDto.getUserId());

        if(user != null && passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            logger.info("Password matched");
            // create toekns & insert RT at DB
            String[] tokens = jwtTokenProvider.generateToken(user.getUserId());

            // modify state to on-line
            user.updateOnLogin(tokens[1]);

            userRepository.save(user);
            UserDto.UserInfoDto userInfoDto = UserDto.UserInfoDto.builder()
                    .userId(user.getUserId())
                    .nickname(user.getNickname())
                    .email(user.getEmail())
                    .experience(user.getExperience())
                    .matchCount(user.getMatchCount())
                    .winCount(user.getWinCount())
                    .build();

            return UserDto.UserWithTokenDto.builder()
                    .accessToken(tokens[0])
                    .refreshToken(tokens[1])
                    .userInfoDto(userInfoDto)
                    .build();
        }

        logger.debug("FAILED TO LOGIN");
        return null;
    }

    @Override
    public int logout(String userId) {
        logger.trace("logout : {}", userId);

        User user = userRepository.findByUserId(userId);

        if(user != null) {
            logger.trace("user found, do logout");
            user.updateOnLogout();

            userRepository.save(user);
            return 0;
        }

        return -1;
    }

    @Override
    public int duplicatedId(String userId) {
        logger.trace("check ID duplication : {}", userId);

        return userRepository.existsByUserId(userId) ? -1 : 0;
    }

    @Override
    public int sendAuthEmail(String email) {
        logger.trace("email entered : {}", email);

        if(userRepository.existsByEmail(email)) return -2;

        String authKey = RandomUtil.randomAuthKey();
        int res = mailService.sendAuthMail(email, authKey);
//        int res = 0;

        if(res > -1) {
            mailAuthRepository.save(MailAuth.builder()
                            .email(email)
                            .authKey(authKey)
                            .authorized(false)
                            .build());
        }
        return res;
    }

    @Override
    public int checkAuthKey(MailDto.MailCheckDto mailCheckDto) {
        logger.trace("check auth key");

        if(!mailAuthRepository.existsById(mailCheckDto.getEmail())) return -3;

        logger.trace("mail : {}, auth : {}", mailCheckDto.getEmail(), mailCheckDto.getAuthKey());
        MailAuth mailAuth = mailAuthRepository.findById(mailCheckDto.getEmail()).get();

        logger.trace("found : {}", mailAuth);
        if(mailAuth.getAuthorized()) return 0;

        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime expireTime = mailAuth.getUpdatedTime().plusMinutes(5L);

        logger.info("compare date :: cur : {}, expire : {}, res : {}",
                currentTime, expireTime, expireTime.compareTo(currentTime));
        if(expireTime.compareTo(currentTime) < 0) return -2;

        if(!mailCheckDto.getAuthKey().equals(mailAuth.getAuthKey())) return -1;

        mailAuth.updateAfterAuth();
        mailAuthRepository.save(mailAuth);

        return 0;
    }

    @Override
    public int findId(String email) {
        logger.trace("find user id : {}", email);

        if(!userRepository.existsByEmail(email)) return -2;
        User user = userRepository.findByEmail(email);

        String userId = user.getUserId();
        int res = mailService.sendIdMail(email, userId);
        return res;
    }

    public int findPw(UserDto.UserFindPwDto userFindPwDto) {
        logger.trace("find user password : {}, {}", userFindPwDto.getUserId(), userFindPwDto.getEmail());

        User user = userRepository.findByUserIdAndEmail(userFindPwDto.getUserId(), userFindPwDto.getEmail());
        if(user == null) return -2;

        String newPassword = RandomUtil.randomPw();
        user.updatePassword(passwordEncoder.encode(newPassword));

        int res = mailService.sendPwMail(user.getEmail(), newPassword);

        if(res == 0)
            userRepository.save(user);

        return res;
    }

    @Override
    public UserDto.UserInfoDto confirmPw(UserDto.UserLoginDto userLoginDto) {
        logger.trace("check user password");

        User user = userRepository.findByUserId(userLoginDto.getUserId());
        if(user == null) return null;
        if(!passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) return null;

        return UserDto.UserInfoDto.builder()
                .nickname(user.getNickname())
                .email(user.getEmail())
                .experience(user.getExperience())
                .winCount(user.getWinCount())
                .matchCount(user.getMatchCount())
                .build();
    }

    @Override
    public List<UserDto.UserInfoDto> searchByUserId(String keyword) {
        logger.trace("search by keyword : {}", keyword);

        if(keyword.trim().length() < 1)
            return null;
        List<User> userList = userRepository.findTop10ByUserIdStartsWith(keyword);

        List<UserDto.UserInfoDto> ret = new ArrayList<>(userList.size());
        userList.forEach(user -> {
            ret.add(UserDto.UserInfoDto.builder()
                            .userId(user.getUserId())
                            .nickname(user.getNickname())
                            .email(user.getEmail())
                            .experience(user.getExperience())
                            .winCount(user.getWinCount())
                            .matchCount(user.getMatchCount())
                        .build());
        });

        return ret;
    }

    @Override
    public String refreshToken(String refreshToken) {
        logger.info("refresh access token");

        String userId = jwtTokenProvider.validateRefreshToken(refreshToken);
        logger.info("userId : {}", userId);

        if(userId == null || userId.startsWith("EXP")) return userId;

        logger.info("find user : {}", userId);

        User user = userRepository.findByUserId(userId);
        if(user == null) {
            logger.info("user NOT FOUND");
            return null;
        }
        logger.info("User found with refresh token : {}", user.getRefreshToken());
        logger.info("Input refresh token : {}", refreshToken);
        if(refreshToken.equals(user.getRefreshToken())) {
            logger.info("NEW TOKEN : {}",jwtTokenProvider.generateAccessToken(userId, System.currentTimeMillis()));
            return jwtTokenProvider.generateAccessToken(userId, System.currentTimeMillis());
        }
        return String.format("EXPIRED :%s", userId);
    }
}
