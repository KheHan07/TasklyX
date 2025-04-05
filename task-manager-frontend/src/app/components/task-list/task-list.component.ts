// src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatusFilter: string = '';
  searchText: string = ''; // New property for search text

  constructor(private taskService: TaskService, public router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filterTasks();
      },
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  filterTasks(): void {
    // Filter by status first
    let tasks = this.tasks;
    if (this.selectedStatusFilter) {
      tasks = tasks.filter(t => t.status === this.selectedStatusFilter);
    }
    // Then filter by search text in title (ignoring case)
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(searchLower));
    }
    this.filteredTasks = tasks;
  }

  editTask(taskId?: string): void {
    if (taskId) {
      this.router.navigate(['/edit-task', taskId]);
    }
  }

  deleteTask(taskId?: string): void {
    if (!taskId) return;
    this.taskService.deleteTask(taskId).subscribe({
      next: (message) => {
        console.log('Delete success:', message);
        this.loadTasks(); // Refresh tasks after deletion
      },
      error: (err) => console.error('Error deleting task', err)
    });
  }

  // Helper methods for status display (if used)
  getStatusLabel(status: string | undefined): string {
    if (!status) {
      return '';
    }
    switch (status) {
      case 'TO_DO':
        return 'To Do';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'DONE':
        return 'Done';
      default:
        return status;
    }
  }

  getStatusClass(status: string | undefined): string {
    if (!status) {
      return '';
    }
    switch (status) {
      case 'TO_DO':
        return 'pill-todo';
      case 'IN_PROGRESS':
        return 'pill-inprogress';
      case 'DONE':
        return 'pill-done';
      default:
        return '';
    }
  }
}
