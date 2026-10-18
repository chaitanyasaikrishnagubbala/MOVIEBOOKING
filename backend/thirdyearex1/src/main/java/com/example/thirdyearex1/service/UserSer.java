package com.example.thirdyearex1.service;

import java.util.List;

import com.example.thirdyearex1.dto.UserDto;

public interface UserSer {

    UserDto registerUser(UserDto userDto);

    List<UserDto> getAllUsers();

    UserDto getUserById(Long id);

    UserDto updateUser(Long id, UserDto userDto);

    void deleteUser(Long id);
    UserDto getCurrentUser(String email);
}