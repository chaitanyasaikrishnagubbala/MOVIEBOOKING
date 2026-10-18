package com.example.thirdyearex1.Jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Debug
        System.out.println("JwtAuthenticationFilter Executed");

        // Read Authorization Header
        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization Header: " + authHeader);

        // If header is missing or invalid
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("Bearer Token Not Found");
            filterChain.doFilter(request, response);
            return;
        }

        // Extract Token
        String token = authHeader.substring(7);
        System.out.println("Token: " + token);

        // Extract Email
        String email = jwtService.extractUsername(token);
        System.out.println("Email From Token: " + email);

        // Authenticate User
        if (email != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            System.out.println("User Loaded: " + userDetails.getUsername());

            if (jwtService.isTokenValid(token, userDetails.getUsername())) {

                System.out.println("JWT Token is Valid");

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("Authentication Set Successfully");
            } else {
                System.out.println("JWT Token is Invalid");
            }
        }

        filterChain.doFilter(request, response);
    }
}