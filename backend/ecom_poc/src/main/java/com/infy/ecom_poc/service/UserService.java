package com.infy.ecom_poc.service;

import com.infy.ecom_poc.dto.RegisterRequest;
import com.infy.ecom_poc.dto.RegisterResponse;
import com.infy.ecom_poc.entity.User;
import com.infy.ecom_poc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // BCrypt encoder to hash passwords
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public RegisterResponse registerUser(RegisterRequest request) {

        // 1. Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // 2. Create User entity
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // 🔐 Encrypted!

        // 3. Save to DB
        User savedUser = userRepository.save(user);

        // 4. Return safe response (no password)
        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                "User registered successfully!"
        );
    }
}