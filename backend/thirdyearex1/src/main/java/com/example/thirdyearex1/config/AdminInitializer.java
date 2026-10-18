package com.example.thirdyearex1.config;

import com.example.thirdyearex1.entity.User;
import com.example.thirdyearex1.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepo userRepo,
            PasswordEncoder passwordEncoder) {

        return args -> {

            String adminEmail = "admin@gmail.com";

            if (userRepo.findByEmail(adminEmail).isEmpty()) {

                User admin = new User();

                admin.setUsername("Admin");
                admin.setEmail(adminEmail);
                admin.setPassword(
                        passwordEncoder.encode("admin123")
                );
                admin.setRole("ROLE_ADMIN");

                userRepo.save(admin);

                System.out.println("=================================");
                System.out.println("ADMIN CREATED");
                System.out.println("Email: admin@gmail.com");
                System.out.println("Password: admin123");
                System.out.println("Role: ROLE_ADMIN");
                System.out.println("=================================");

            } else {

                System.out.println("Admin already exists.");

            }
        };
    }
}