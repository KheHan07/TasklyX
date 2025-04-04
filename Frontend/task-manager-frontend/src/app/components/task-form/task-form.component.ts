
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId?: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if there's an ID in the URL => editing mode
    this.taskId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEditMode = !!this.taskId;

    // Initialize the form
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['TO_DO']
    });

    // If editing, load the existing task and populate the form
    if (this.isEditMode && this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (task) => {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            status: task.status
          });
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const taskData: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status
    };

    if (this.isEditMode && this.taskId) {
      // Update existing task
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => console.error(err)
      });
    } else {
      // Create new task
      this.taskService.createTask(taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => console.error(err)
      });
    }
  }
}
