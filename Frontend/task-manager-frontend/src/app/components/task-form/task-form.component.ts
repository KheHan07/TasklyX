// src/app/components/task-form/task-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEditMode = !!this.taskId;

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['TO_DO']
    });

    if (this.isEditMode && this.taskId) {
      // We must call "update" approach
      // But first let's fetch the existing to prefill
      // Actually we can't do a direct GET. We'll do a "fetch all" and find it
      // or we might do a separate route. Let's skip for brevity. We'll do "All tasks" then find local.
      // For simplicity, let's do "All tasks" in real scenario, or call a "fetchSingle" approach.
      // We'll do a quick approach:
      this.taskService.getAllTasks().subscribe({
        next: tasks => {
          const t = tasks.find(x => x.id === this.taskId);
          if (t) {
            this.taskForm.patchValue({
              title: t.title,
              description: t.description,
              status: t.status
            });
          }
        }
      });
    }
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    const taskData: Task = { ...this.taskForm.value };

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: err => console.error('Update error', err)
      });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: err => console.error('Create error', err)
      });
    }
  }
}
