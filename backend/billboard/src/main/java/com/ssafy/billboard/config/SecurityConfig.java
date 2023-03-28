package com.ssafy.billboard.config;

import com.ssafy.billboard.security.JwtAccessDeniedHandler;
import com.ssafy.billboard.security.JwtAuthenticationEntryPoint;
import com.ssafy.billboard.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                .cors().disable()   // disable CORS : will be removed
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
//                .antMatchers("/api/followes/**").authenticated()
                .anyRequest().permitAll()

        ;

        return http.build();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
