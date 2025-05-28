import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../../../services/document.service';
import { AuthService } from '../../../services/auth.service';
import { Document } from '../../../models/document.model';

@Component({
  selector: 'app-document-list',
  template: `
    <div class="document-list-container">
      <mat-card class="table-wrapper">
        <mat-card-header>
          <mat-card-title class="primary">Documents</mat-card-title>
          <div class="spacer"></div>
          <button mat-raised-button color="primary" routerLink="/documents/upload">
            Upload Document
          </button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="documents" class="table-container">
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let document">{{document.title}}</td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let document">{{document.description}}</td>
            </ng-container>

            <ng-container matColumnDef="fileType">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let document">{{document.file_type}}</td>
            </ng-container>

            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Created</th>
              <td mat-cell *matCellDef="let document">{{document.created_at | date}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let document" class="action-buttons-container">
                <button mat-icon-button [routerLink]="['/documents', document.id, 'edit']" 
                        *ngIf="canEdit()">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="deleteDocument(document.id)"
                        *ngIf="canDelete()">
                  <mat-icon class="error">delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div class="mt-3 text-center" *ngIf="documents.length==0">No Data Available!</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .document-list-container {
      padding: 20px;
    }

    mat-card-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    table {
      width: 100%;
    }
    .mat-column-actions {
      width: 120px;
      text-align: center;
    }
    .action-buttons-container{
      display:flex;
    }
  `]
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  displayedColumns: string[] = ['title', 'description', 'fileType', 'createdAt', 'actions'];

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.getDocuments().subscribe({
      next: (documents) => {
        this.documents = documents;
      },
      error: (error) => {
        console.error('Error loading documents:', error);
        // Handle error (show error message)
      }
    });
  }

  deleteDocument(id: number): void {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(id).subscribe({
        next: () => {
          this.loadDocuments();
        },
        error: (error) => {
          console.error('Error deleting document:', error);
          // Handle error (show error message)
        }
      });
    }
  }

  canEdit(): boolean {
    return this.authService.hasRole('admin') || this.authService.hasRole('editor');
  }

  canDelete(): boolean {
    return this.authService.hasRole('admin');
  }
} 