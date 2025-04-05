import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { username, password } = this.registerForm.value;
    this.authService.register(username, password).subscribe({
      next: (res: string) => {
        // res is "User registered successfully!"
        this.successMessage = res;
        // Optionally navigate to /login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // If server throws exception, or 4xx/5xx
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}
