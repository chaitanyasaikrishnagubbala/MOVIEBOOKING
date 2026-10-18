package com.example.thirdyearex1.service.imp;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.thirdyearex1.dto.UserDto;
import com.example.thirdyearex1.entity.User;
import com.example.thirdyearex1.repo.UserRepo;
import com.example.thirdyearex1.service.UserSer;

@Service
public class UserImp implements UserSer {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepo userRepo;

    // DTO -> Entity
    private User dtoToEntity(UserDto dto) {

        User user = new User();

        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole("ROLE_USER");
        return user;
    }

    // Entity -> DTO
    private UserDto entityToDto(User user) {

        UserDto dto = new UserDto();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPassword(null);
        dto.setRole(user.getRole());
        return dto;
    }

    @Override
    public UserDto registerUser(UserDto userDto) {

        User user = dtoToEntity(userDto);

        User savedUser = userRepo.save(user);

        return entityToDto(savedUser);
    }

    @Override
    public List<UserDto> getAllUsers() {

        return userRepo.findAll()
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long id) {

        User user = userRepo.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        return entityToDto(user);
    }
    @Override
    public UserDto getCurrentUser(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return entityToDto(user);
    }
    @Override
    public UserDto updateUser(Long id, UserDto userDto) {

        User existingUser = userRepo.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setUsername(userDto.getUsername());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));

        User updatedUser = userRepo.save(existingUser);

        return entityToDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {

        userRepo.deleteById(id);
    }
}