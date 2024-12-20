package com.kfs.kfs.controller;

import com.kfs.kfs.repository.UserRepository;
import com.kfs.kfs.modell.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/") // Frontend URL
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Save a new user (no encryption)
    @PostMapping("/saveUser")
    public Users newUser(@RequestBody Users newUser) {
        return userRepository.save(newUser); // Save user without password encryption
    }

    // Get all users
    @GetMapping("/allUser")
    public List<Users> getAllMessage() {
        return userRepository.findAll();
    }

    // Login user (no encryption, comparing plain-text passwords)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users loginUser) {
        Optional<Users> userOptional = userRepository.findByEmail(loginUser.getEmail());

        if (userOptional.isPresent()) {
            Users user = userOptional.get();

            // Compare plain-text passwords
            if (loginUser.getPassaword().equals(user.getPassaword())) {
                // Password matches, send success response with user details
                return ResponseEntity.ok(user); // You can also include a token here
            } else {
                return ResponseEntity.status(401).body("Invalid email or password");
            }
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
