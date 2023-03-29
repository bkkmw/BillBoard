package com.ssafy.billboard.security;

import com.ssafy.billboard.model.service.JwtUserDetailService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtUserDetailService jwtUserDetailService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = parseToken(request);

        if(token != null) {
            int res = jwtTokenProvider.validateAccessToken(token);
            if(res == 0) {
                logger.info("VALID TOKEN");
                Claims claims = jwtTokenProvider.getClaims(token);

                Object claimName = claims.get("name");
                String userId = "";
                if(claimName instanceof String) userId = (String)claimName;

                UserDetails userDetails = jwtUserDetailService.loadUserByUsername(userId);

                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(userDetails,
                                null,
                                userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            if(res == -1) {
                logger.info("Invalid token : {}", token);
            }
            if(res == +1) {
                logger.info("Token has been expired : {}", token);
            }
        }
        else {
            logger.info("No bearer token found");
        }

        filterChain.doFilter(request, response);
    }

    private String parseToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        logger.info("Authorization : {}", bearerToken);

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            logger.info("Received token : {}", bearerToken.substring(7));
            return bearerToken.substring(7);
        }
        else return null;
    }
}
