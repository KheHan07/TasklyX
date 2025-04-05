package com.taskmanager.taskmanager.service;

import com.taskmanager.taskmanager.model.Task;
import com.taskmanager.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepo;

    public TaskService(TaskRepository taskRepo) {
        this.taskRepo = taskRepo;
    }

    // get tasks for user
    public List<Task> getTasks(String username) {
        return taskRepo.findByOwnerUsername(username);
    }

    // create
    public Task createTask(String username, String title, String description, String status) {
        Task t = new Task();
        t.setOwnerUsername(username);
        t.setTitle(title);
        t.setDescription(description);
        t.setStatus(status);
        t.setCreatedAt(LocalDateTime.now());
        return taskRepo.save(t);
    }

    // update
    public Task updateTask(String username, String taskId, String title, String description, String status) {
        Task existing = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        // check ownership
        if (!existing.getOwnerUsername().equals(username)) {
            throw new RuntimeException("Not authorized to update this task");
        }
        existing.setTitle(title);
        existing.setDescription(description);
        existing.setStatus(status);
        return taskRepo.save(existing);
    }

    // delete
    public void deleteTask(String username, String taskId) {
        Task existing = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!existing.getOwnerUsername().equals(username)) {
            throw new RuntimeException("Not authorized to delete this task");
        }
        taskRepo.deleteById(taskId);
    }
}
