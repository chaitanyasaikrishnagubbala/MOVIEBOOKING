package com.example.thirdyearex1.config;

import com.example.thirdyearex1.Jwt.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.example.thirdyearex1.service.imp.CustomUserDetailsService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Value("${allowed.origins:${ALLOWED_ORIGINS:http://localhost:5173}}")
    private String allowedOrigins;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Enable CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Disable CSRF because we are using JWT
                .csrf(csrf -> csrf.disable())

                // Stateless session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                                // Login is public
                                .requestMatchers("/auth/**").permitAll()

// Registration is public
                                .requestMatchers(HttpMethod.POST, "/users").permitAll()

// User management is ADMIN only
                                .requestMatchers(HttpMethod.GET, "/users/**")
                                .hasAuthority("ROLE_ADMIN")

                                .requestMatchers(HttpMethod.PUT, "/users/**")
                                .hasAuthority("ROLE_ADMIN")

                                .requestMatchers(HttpMethod.DELETE, "/users/**")
                                .hasAuthority("ROLE_ADMIN")
                        // Allow CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Movie APIs
                        .requestMatchers(HttpMethod.POST, "/movies/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/movies/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/movies/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/movies/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        // Theater APIs
                        .requestMatchers(HttpMethod.POST, "/theaters/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/theaters/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/theaters/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/theaters/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        // Screen APIs
                        .requestMatchers(HttpMethod.POST, "/screens/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/screens/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/screens/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/screens/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        // Show APIs
                        .requestMatchers(HttpMethod.POST, "/shows/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/shows/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/shows/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/shows/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        // Seat APIs
                        .requestMatchers(HttpMethod.POST, "/seats/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/seats/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/seats/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/seats/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        // Booking APIs
                        .requestMatchers(HttpMethod.POST, "/bookings/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        .requestMatchers(HttpMethod.GET, "/bookings/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        .requestMatchers(HttpMethod.PUT, "/bookings/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        // Booking Seat APIs
                        .requestMatchers(HttpMethod.POST, "/booking-seats/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        .requestMatchers(HttpMethod.GET, "/booking-seats/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        .requestMatchers(HttpMethod.DELETE, "/booking-seats/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        // Transaction APIs
                        .requestMatchers(HttpMethod.POST, "/transactions/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        .requestMatchers(HttpMethod.PUT, "/transactions/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")

                        .requestMatchers(HttpMethod.DELETE, "/transactions/**")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/transactions/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")
                        .requestMatchers(HttpMethod.PUT, "/bookings/cancel/**").authenticated()
                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )

                // JWT Filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    // =========================
    // CORS CONFIGURATION
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        List<String> origins = new ArrayList<>();
        origins.add("http://localhost:5173");

        if (allowedOrigins != null && !allowedOrigins.trim().isEmpty()) {
            for (String origin : allowedOrigins.split(",")) {
                String trimmed = origin.trim();
                if (!trimmed.isEmpty() && !origins.contains(trimmed)) {
                    origins.add(trimmed);
                }
            }
        }

        configuration.setAllowedOrigins(origins);

        // HTTP methods
        configuration.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        // Allow all headers
        configuration.setAllowedHeaders(
                Arrays.asList("*")
        );

        // Allow credentials such as Authorization header
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}