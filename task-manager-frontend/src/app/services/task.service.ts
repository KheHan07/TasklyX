// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Task {
  id?: string;
  title: string;
  description?: string;
  status?: string;
  createdAt?: string;
  ownerUsername?: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllTasks(): Observable<Task[]> {
    const body = {
      username: this.auth.getUsername(),
      tokenid: this.auth.getTokenid()
    };
    return this.http.post<Task[]>(`${this.baseUrl}/all`, body);
  }

  createTask(task: Task): Observable<Task> {
    const body = {
      username: this.auth.getUsername(),
      tokenid: this.auth.getTokenid(),
      title: task.title,
      description: task.description,
      status: task.status
    };
    return this.http.post<Task>(`${this.baseUrl}/create`, body);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    const body = {
      username: this.auth.getUsername(),
      tokenid: this.auth.getTokenid(),
      taskId: id,
      title: task.title,
      description: task.description,
      status: task.status
    };
    return this.http.post<Task>(`${this.baseUrl}/update`, body);
  }

  deleteTask(id: string): Observable<string> {
    const body = {
      username: this.auth.getUsername(),
      tokenid: this.auth.getTokenid(),
      taskId: id
    };
    // Specify responseType as 'text' so that Angular parses the plain text response correctly,
    // then cast the result to Observable<string>
    return this.http
      .post(`${this.baseUrl}/delete`, body, { responseType: 'text' as 'json' }) as Observable<string>;
  }
}
