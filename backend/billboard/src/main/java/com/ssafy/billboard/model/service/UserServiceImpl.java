package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.MailDto;
import com.ssafy.billboard.model.dto.UserDto;
import com.ssafy.billboard.model.entity.MailAuth;
import com.ssafy.billboard.model.entity.User;
import com.ssafy.billboard.model.repository.MailAuthRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import com.ssafy.billboard.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final MailAuthRepository mailAuthRepository;
    private final MailService mailService;
    @Override
    public int signup(UserDto.UserSignUpDto userSignUpDto) {
        logger.trace("user SignUp : {}", userSignUpDto);


        if(!userRepository.existsByUserId(userSignUpDto.getUserId())){
            logger.trace("{} user not found", userSignUpDto.getUserId());

            if(userRepository.existsByEmail(userSignUpDto.getEmail())) return -1;

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
    public UserDto.UserInfoDto getUserInfo(String userId) {
        logger.trace("find user : {}", userId);
        User user = userRepository.findByUserId(userId);

        if(user == null) return null;

        return UserDto.UserInfoDto.builder()
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
    // return type will be changed after implementing token
    public UserDto.UserInfoDto login(UserDto.UserLoginDto userLoginDto) {
        logger.trace("login : {} , {}", userLoginDto.getUserId(), userLoginDto.getPassword());

        User user = userRepository.findByUserId(userLoginDto.getUserId());

        if(user != null && passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            logger.info("Password matched");
            // create toekns & insert RT at DB
            // modify state to on-line
            user.updateOnLogin("AA");

            userRepository.save(user);
            return UserDto.UserInfoDto.builder()
                    .nickname(user.getNickname())
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



    /*
    * returns result of ID duplication check
    * -1 : duplicated ID
    * 0 : available ID
    * */

    @Override
    public int duplicatedId(String userId) {
        logger.trace("check ID duplication : {}", userId);

        return userRepository.existsByUserId(userId) ? -1 : 0;
    }

    // returns -2(Existing Email)
    // returns -1(failed to send email)
    // returns 0(sent successfully)
    @Override
    public int sendAuthEmail(String email) {
        logger.trace("email entered : {}", email);

        if(userRepository.existsByEmail(email)) return -2;

        String authKey = RandomUtil.randomAuthKey();
        int res = mailService.sendAuthMail(email, authKey);
//        int res = 0;

        if(res > -1) {
            Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
//            currentTimeStamp.setTime(currentTimeStamp.getTime() + (9 * 60 * 60 * 1000));
            // use UTC, jdbc modifies it when reading time
            currentTimeStamp.setTime(currentTimeStamp.getTime() + (10 * 60 * 1000));
            mailAuthRepository.save(MailAuth.builder()
                            .email(email)
                            .authKey(authKey)
                            .expireAt(currentTimeStamp)
                            .build());
        }
        return res;
    }

    // returns -3(not found)
    // returns -2(expired auth)
    // returns -1(incorrect key)
    // returns 0(correct key)
    @Override
    public int checkAuthKey(MailDto.MailCheckDto mailCheckDto) {
        logger.trace("check auth key");

        if(!mailAuthRepository.existsById(mailCheckDto.getEmail())) return -3;

        MailAuth mailAuth = mailAuthRepository.findById(mailCheckDto.getEmail()).get();

        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        currentTime.setTime(currentTime.getTime() + (9 * 60 & 60 * 1000));
        logger.info("compare date :: cur : {}, expire : {}, res : {}",
                currentTime, mailAuth.getExpireAt(), currentTime.compareTo(mailAuth.getExpireAt()));
        if(currentTime.compareTo(mailAuth.getExpireAt()) > 0) return -2;

        if(!mailCheckDto.getAuthKey().equals(mailAuth.getAuthKey())) return -1;

        return 0;
    }

    /*
    returns : 0(Success), -2(Not found), -1(failed to send mail)
     */
    @Override
    public int findId(String email) {
        logger.trace("find user id : {}", email);

        if(!userRepository.existsByEmail(email)) return -2;
        User user = userRepository.findByEmail(email);

        String userId = user.getUserId();
        int res = mailService.sendIdMail(email, userId);
        return res;
    }

    /*
    returns : 0(Success), -2(Not found), -1(failed to send mail)
     */
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

    /*
    returns : 0(Success), -1(Not found)
     */
    public int increaseCount(String userId, boolean isWin) {
        logger.trace("increase Count : {}, win ? {}", userId, isWin);

        User user = userRepository.findByUserId(userId);

        if(user == null) return -1;
        user.updateCount(isWin);
        userRepository.save(user);

        return 0;
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
}
