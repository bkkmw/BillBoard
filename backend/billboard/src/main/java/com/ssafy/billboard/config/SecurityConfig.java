package com.ssafy.billboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import javax.servlet.DispatcherType;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // WebSecurityConfigurerAdapter has been deprecated

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()   // disable CSRF
                .cors().disable()   // disable CORS
//                .authorizeHttpRequests(request ->
//                        request.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
//                                .anyRequest().authenticated()
//                )
                .formLogin().disable()  // disable default login form
                .logout(Customizer.withDefaults())
        ;

        return http.build();
    }
}
