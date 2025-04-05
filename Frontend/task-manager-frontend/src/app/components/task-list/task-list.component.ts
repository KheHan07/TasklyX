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
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatusFilter = '';

  constructor(
    private taskService: TaskService,
    public router: Router // <-- public instead of private
  ) {}
  

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  filterTasks() {
    if (this.selectedStatusFilter) {
      this.filteredTasks = this.tasks.filter(t => t.status === this.selectedStatusFilter);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  editTask(id?: string) {
    if (id) {
      this.router.navigate(['/edit-task', id]);
    }
  }

  deleteTask(id?: string) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Error deleting task', err)
    });
  }
}
