package com.ssafy.billboard.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final SecretKey SECRET_KEY;

    private final long ACCESS_TOKEN_EXPIRES_AT = 5 * 60 * 60 * 1000L;
    private final long REFRESH_TOKEN_EXPIRES_AT = 7 * 24 * 60 * 60 * 1000L;

    public JwtTokenProvider(@Value("${jwt.secret-key}")String key) {
        byte[] keyBytes = Decoders.BASE64.decode(key);
        this.SECRET_KEY = Keys.hmacShaKeyFor(keyBytes);
    }

    public String[] generateToken(String userId) {
        logger.info("create both token : {}", userId);

        Long currentTime = System.currentTimeMillis();

        String accessToken = generateAccessToken(userId, currentTime);
        String refreshToken = generateRefreshToken(userId, currentTime);

        logger.info("created token : {}, {}", accessToken, refreshToken);
        return new String[] {accessToken, refreshToken};
    }

    public String generateAccessToken(String userId, long iat) {
        logger.trace("create access token : {}", userId);
        Claims claims = Jwts.claims();
        claims.setSubject("access");
        claims.put("name", userId);

        claims.setIssuedAt(new Date(iat));
        logger.info("current time : {}", new Date(iat).toString());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(iat + ACCESS_TOKEN_EXPIRES_AT))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(String userId, long iat) {
        logger.trace("create refresh token : {}", userId);
        Claims claims = Jwts.claims();
        claims.setSubject("refresh");
        claims.put("name", userId);

        claims.setIssuedAt(new Date(iat));
        logger.info("current time : {}", new Date(iat).toString());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(iat + REFRESH_TOKEN_EXPIRES_AT))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * validate access token
     * @param accessToken
     * @return +1 for expired token, 0 for valid token, -1 for invalid token
     */
    public int validateAccessToken(String accessToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();

            if(!"access".equals(claims.getSubject())) return -1;

            logger.info("VALID TOKEN");
            return 0;
        } catch (UnsupportedJwtException | MalformedJwtException | IllegalStateException e) {
            logger.info("Invalid token : {}", accessToken);
            logger.info("Exception : {}", e.getMessage());
            return -1;
        } catch (ExpiredJwtException e) {
            logger.info("Token has been expired");
            logger.info("Expired token of : {}", e.getClaims().get("name"));
            return 1;
        } catch (SignatureException e) {
            logger.info("Failed to check signature");
            return -1;
        }
    }

    /**
     * validate refresh token
     * @param refreshToken
     * @return userId if valid, 'EXPIRED :userId' if expired, null if invalid
     */
    public String validateRefreshToken(String refreshToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(refreshToken)
                    .getBody();

            if(!"refresh".equals(claims.getSubject())) return null;

            logger.info("VALID TOKEN");
            return (claims.get("name") instanceof String) ? (String)claims.get("name") : null;
        } catch (UnsupportedJwtException | MalformedJwtException | IllegalStateException e) {
            logger.info("Invalid refresh token : {}", refreshToken);
            logger.info("Exception : {}", e.getMessage());
            return null;
        } catch (ExpiredJwtException e) {
            logger.info("Token has been expired");
            logger.info("Expired token : {}", e.getClaims().get("name"));
            return String.format("EXPIRED :%s", e.getClaims().get("name")).toString();
        } catch (SignatureException e) {
            logger.info("Failed to check signature");
            return null;
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
