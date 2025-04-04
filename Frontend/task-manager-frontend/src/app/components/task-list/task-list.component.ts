
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

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
  selectedStatusFilter = '';

  constructor(public router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  createTask(): void {
    this.router.navigate(['/create-task']);
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      error: (err) => console.error(err)
    });
  }

  filterTasks(): void {
    if (this.selectedStatusFilter) {
      this.filteredTasks = this.tasks.filter(
        (t) => t.status === this.selectedStatusFilter
      );
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  editTask(taskId?: string): void {
    if (taskId) {
      this.router.navigate(['/edit-task', taskId]);
    }
  }

  deleteTask(taskId?: string): void {
    if (!taskId) return;
    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error(err)
    });
  }
}
