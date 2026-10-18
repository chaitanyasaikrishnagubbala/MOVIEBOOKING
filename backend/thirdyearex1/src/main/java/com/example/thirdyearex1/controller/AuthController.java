package com.example.thirdyearex1.controller;

import com.example.thirdyearex1.dto.LoginDto;
import com.example.thirdyearex1.dto.LoginResponse;
import com.example.thirdyearex1.entity.User;
import com.example.thirdyearex1.Jwt.JwtService;
import com.example.thirdyearex1.repo.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepo;


    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginDto loginDto) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );


        User user = userRepo.findByEmail(loginDto.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );


        String token =
                jwtService.generateToken(loginDto.getEmail());


        return new LoginResponse(
                token,
                user.getUsername(),
                user.getRole()
        );
    }
}