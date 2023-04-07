package com.ssafy.billboard.config;

import com.ssafy.billboard.security.JwtAccessDeniedHandler;
import com.ssafy.billboard.security.JwtAuthenticationEntryPoint;
import com.ssafy.billboard.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.DispatcherType;

@Configuration
@EnableWebSecurity(debug = false)
@RequiredArgsConstructor
public class SecurityConfig {
    // WebSecurityConfigurerAdapter has been deprecated

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()   // disable CSRF : no need for API server
//                .cors().disable()   // disable CORS : will be removed
                .cors().configurationSource(corsConfigurationSource())
                .and()
                // Stateless
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .formLogin().disable()  // disable default login form
                .logout(Customizer.withDefaults()) // ????
                // jwt filter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                // exception handling
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                // set request
                .and()
                .authorizeRequests()
                .antMatchers("/api/users/login",
                        "/api/users/check-id",
                        "/api/users/email-auth",
                        "/api/users/check-authkey",
                        "/api/users/find-id",
                        "/api/users/find-password",
                        "/api/users/check-password",
                        "/api/refresh"
                ).permitAll()
                .antMatchers(HttpMethod.POST, "/api/users").permitAll()
                .antMatchers("/swagger-ui/**",
                        "/swagger-ui.html/**",
                        "/v3/api-docs/**")
                .permitAll()
//                .anyRequest().authenticated()
        ;

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // for local test
        corsConfiguration.addAllowedOrigin("http://127.0.0.1:3000");
        corsConfiguration.addAllowedOrigin("http://127.0.0.1:8000");
        corsConfiguration.addAllowedOrigin("http://localhost:3000");
        // ec2 - react
        corsConfiguration.addAllowedOrigin("https://j8a505.p.ssafy.io");
        corsConfiguration.addAllowedOrigin("http://j8a505.p.ssafy.io:3000");

        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");

        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;

    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
