package com.example.thirdyearex1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.thirdyearex1.dto.UserDto;
import com.example.thirdyearex1.service.UserSer;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserSer userSer;

    // Register User
    @PostMapping
    public UserDto registerUser(@RequestBody UserDto userDto) {
        return userSer.registerUser(userDto);
    }

    // Get All Users
    @GetMapping
    public List<UserDto> getAllUsers() {
        return userSer.getAllUsers();
    }

    // Get User By Id
    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return userSer.getUserById(id);
    }

    // Update User
    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable Long id,
                              @RequestBody UserDto userDto) {
        return userSer.updateUser(id, userDto);
    }

    // Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userSer.deleteUser(id);
        return "User deleted successfully.";
    }
    @GetMapping("/me")
    public UserDto getCurrentUser(
            Authentication authentication) {

        String email = authentication.getName();

        return userSer.getCurrentUser(email);
    }
}