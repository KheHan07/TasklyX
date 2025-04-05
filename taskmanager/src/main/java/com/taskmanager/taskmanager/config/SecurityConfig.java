package com.taskmanager.taskmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        // Let our custom endpoints be accessible:
                        .requestMatchers("/api/auth/**").permitAll()
                        // All others require authentication in a real scenario,
                        // but here let's just open them for demo:
                        .requestMatchers("/api/tasks/**").permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }

}
