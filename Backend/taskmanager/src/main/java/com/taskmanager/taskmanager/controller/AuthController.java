package com.taskmanager.taskmanager.controller;

import com.taskmanager.taskmanager.model.User;
import com.taskmanager.taskmanager.repository.UserRepository;
import com.taskmanager.taskmanager.util.JwtUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User body) {
        // check if user exists
        Optional<User> existing = userRepo.findByUsername(body.getUsername());
        if (existing.isPresent()) {
            // you can return 400 if you like:
            // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already taken");
            throw new RuntimeException("Username already taken");
        }
        userRepo.save(body);
        // Return a plain-text body with HTTP 200
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User body) {
        User found = userRepo.findByUsername(body.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!found.getPassword().equals(body.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String tokenid = jwtUtil.generateToken(found.getUsername());
        return ResponseEntity.ok(new LoginResponse(found.getUsername(), tokenid));
    }

    static class LoginResponse {
        public String username;
        public String tokenid;

        public LoginResponse(String username, String tokenid) {
            this.username = username;
            this.tokenid = tokenid;
        }
    }
}
