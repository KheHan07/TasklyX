package com.taskmanager.taskmanager.controller;

import com.taskmanager.taskmanager.model.Task;
import com.taskmanager.taskmanager.service.TaskService;
import com.taskmanager.taskmanager.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;
    private final JwtUtil jwtUtil;

    public TaskController(TaskService taskService, JwtUtil jwtUtil) {
        this.taskService = taskService;
        this.jwtUtil = jwtUtil;
    }

    // POST /api/tasks/all => { username, tokenid }
    @PostMapping("/all")
    public ResponseEntity<List<Task>> getAll(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String tokenid = body.get("tokenid");

        // validate token
        validateToken(username, tokenid);

        // fetch tasks for user
        List<Task> tasks = taskService.getTasks(username);
        return ResponseEntity.ok(tasks);
    }

    // POST /api/tasks/create => { username, tokenid, title, description, status }
    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String tokenid = body.get("tokenid");
        String title = body.get("title");
        String description = body.get("description");
        String status = body.get("status");

        validateToken(username, tokenid);

        Task created = taskService.createTask(username, title, description, status);
        return ResponseEntity.ok(created);
    }

    // POST /api/tasks/update => { username, tokenid, taskId, title, description, status }
    @PostMapping("/update")
    public ResponseEntity<Task> updateTask(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String tokenid = body.get("tokenid");
        String taskId = body.get("taskId");
        String title = body.get("title");
        String description = body.get("description");
        String status = body.get("status");

        validateToken(username, tokenid);

        Task updated = taskService.updateTask(username, taskId, title, description, status);
        return ResponseEntity.ok(updated);
    }

    // POST /api/tasks/delete => { username, tokenid, taskId }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteTask(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String tokenid = body.get("tokenid");
        String taskId = body.get("taskId");

        // Validate token: throws exception if invalid
        validateToken(username, tokenid);

        // Delete the task (throws exception if not found or unauthorized)
        taskService.deleteTask(username, taskId);
        return ResponseEntity.ok("Task deleted");
    }

    private void validateToken(String username, String tokenid) {
        if (username == null || tokenid == null) {
            throw new RuntimeException("Missing username/tokenid");
        }
        // decode token
        String extractedUser = jwtUtil.validateTokenAndGetUsername(tokenid);
        if (!extractedUser.equals(username)) {
            throw new RuntimeException("Token does not match user");
        }
    }
}
