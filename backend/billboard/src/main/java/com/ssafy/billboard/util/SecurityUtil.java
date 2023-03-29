package com.ssafy.billboard.util;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Slf4j
public class SecurityUtil {

    private static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

    /**
     * get user id based on Security Context
     * @return userId
     * @return anonymousUser (not found)
     */
    public static String getUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null) return null;

        Object principal = authentication.getPrincipal();
        String userId = null;
        if(principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            userId = userDetails.getUsername();
            logger.info("UserDetails found : {}", userId);
        } else if(principal instanceof String) {
            userId = (String) principal;
            logger.info("user ID found : {}",userId);
        }

        return userId;
    }
}
