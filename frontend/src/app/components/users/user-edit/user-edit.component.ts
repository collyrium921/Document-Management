import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  UserRole } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit',
  template: `
    <div class="edit-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title class="primary">Edit User</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-3">
          <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="full_name" required>
              <mat-error *ngIf="editForm.get('full_name')?.hasError('required')">
                Full name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required>
              <mat-error *ngIf="editForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="editForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Role</mat-label>
              <mat-select formControlName="role" required>
                <mat-option [value]="UserRole.VIEWER">Viewer</mat-option>
                <mat-option [value]="UserRole.EDITOR">Editor</mat-option>
                <mat-option [value]="UserRole.ADMIN">Admin</mat-option>
              </mat-select>
              <mat-error *ngIf="editForm.get('role')?.hasError('required')">
                Role is required
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" routerLink="/users">Cancel</button>
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="editForm.invalid || !editForm.dirty">
                Save Changes
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .edit-container {
      padding: 20px;
    }
    mat-card {
      max-width: 600px;
      margin: 0 auto;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    mat-form-field {
      width: 100%;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 20px;
    }
  `]
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  userId: number;
  UserRole = UserRole;

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.userId = this.route.snapshot.params['id'];
    this.editForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        this.editForm.patchValue({
          full_name: user.full_name,
          email: user.email,
          role: user.role
        });
      },
      error: (error) => {
        console.error('Error loading user:', error);
        // Handle error (show error message)
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.editForm.dirty) {
      const { full_name, email, role } = this.editForm.value;
      
      this.userService.updateUser(this.userId, {
        full_name,
        email,
        role
      }).subscribe({
        next: () => {
          this._snackBar.open("Updated successfully!", "Close", { duration: 3000 });
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          const errorMessage = error.error?.detail || "Edit failed. Please try again.";
          this._snackBar.open(errorMessage, "Close", { duration: 5000 });
          // Handle error (show error message)
        }
      });
    }
  }
} 