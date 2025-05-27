import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { UserRole } from "../../../models/user.model";

@Component({
  selector: "app-register",
  template: `
    <div class="register-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title class="primary">Create Account</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-3">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="fullName" required />
              <mat-error
                *ngIf="registerForm.get('fullName')?.hasError('required')"
              >
                Full name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required />
              <mat-error
                *ngIf="registerForm.get('email')?.hasError('required')"
              >
                Email is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input
                matInput
                formControlName="password"
                type="password"
                required
              />
              <mat-error
                *ngIf="registerForm.get('password')?.hasError('required')"
              >
                Password is required
              </mat-error>
              <mat-error
                *ngIf="registerForm.get('password')?.hasError('minlength')"
              >
                Password must be at least 8 characters
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Role</mat-label>
              <mat-select formControlName="role" required>
                <mat-option [value]="UserRole.ADMIN">Admin</mat-option>
                <mat-option [value]="UserRole.EDITOR">Editor</mat-option>
                <mat-option [value]="UserRole.VIEWER">Viewer</mat-option>
              </mat-select>
              <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                Role is required
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="registerForm.invalid"
            >
              Create Account
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <div>
            <span>Already have an account?</span
            ><span class="primary pointer" routerLink="/auth/login">
              Login!</span
            >
          </div>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 82vh;
        background-color: #f5f5f5;
      }
      mat-card {
        width: 100%;
        max-width: 400px;
        padding: 20px;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      mat-form-field {
        width: 100%;
      }
      button[type="submit"] {
        width: 100%;
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  UserRole = UserRole;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      role: [UserRole.ADMIN, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { fullName, email, password, role } = this.registerForm.value;
      this.authService.register(fullName, email, password, role).subscribe({
        next: () => {
          this.router.navigate(["/auth/login"]);
        },
        error: (error) => {
          console.error("Registration failed:", error);
          // Handle registration error (show error message)
        },
      });
    }
  }
}
