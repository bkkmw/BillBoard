package com.ssafy.billboard.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final SecretKey SECRET_KEY;

    private final long ACCESS_TOKEN_EXPIRES_AT = 5 * 60 * 1000L;
    private final long REFRESH_TOKEN_EXPIRES_AT = 1 * 60 * 60 * 1000L;

    public JwtTokenProvider(@Value("${jwt.secret-key}")String key) {
        byte[] keyBytes = Decoders.BASE64.decode(key);
        this.SECRET_KEY = Keys.hmacShaKeyFor(keyBytes);
    }

    public String[] generateToken(String userId) {
        logger.info("create token : {}", userId);
        Claims claims = Jwts.claims();
        claims.setSubject("token");
        claims.put("name", userId);

        Long currentTime = System.currentTimeMillis();
        claims.setIssuedAt(new Date(currentTime));
        logger.info("current time : {}", new Date(currentTime).toString());

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(currentTime + ACCESS_TOKEN_EXPIRES_AT))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();

        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(currentTime + REFRESH_TOKEN_EXPIRES_AT))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();

        logger.info("created token : {}, {}", accessToken, refreshToken);
        return new String[] {accessToken, refreshToken};
    }

    public int validateAccessToken(String accessToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(accessToken);

            logger.info("VALID TOKEN");
            return 0;
        } catch (UnsupportedJwtException | MalformedJwtException | IllegalStateException e) {
            logger.info("Invalid token : {}", accessToken);
            logger.info("Exception : {}", e.getMessage());
            return -1;
        } catch (ExpiredJwtException e) {
            logger.info("Token has been expired");
            return 1;
        } catch (SignatureException e) {
            logger.info("Failed to check signature");
            return -1;
        }
    }

    public Claims getClaims(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token).getBody();
            return claims;
        } catch (Exception e) {
            logger.info("STH has been wrong : {}", e.getMessage());
            return null;
        }

    }
}
