import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingestion } from '../../../models/ingestion.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-ingestion-list',
  template: `
    <div class="ingestion-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title class="primary">Ingestions</mat-card-title>
          <div class="header-actions">
            <button mat-raised-button color="primary" routerLink="/ingestions/create">
              Create Ingestion
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="ingestions" class="table-container">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let ingestion">{{ingestion.id}}</td>
            </ng-container>

            <ng-container matColumnDef="documentId">
              <th mat-header-cell *matHeaderCellDef>Document ID</th>
              <td mat-cell *matCellDef="let ingestion">{{ingestion.document_id}}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let ingestion">
                <span [class]="'status-' + ingestion.status.toLowerCase()">
                  {{ingestion.status}}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="startedAt">
              <th mat-header-cell *matHeaderCellDef>Started At</th>
              <td mat-cell *matCellDef="let ingestion">{{ingestion.started_at | date:'medium'}}</td>
            </ng-container>

            <ng-container matColumnDef="completedAt">
              <th mat-header-cell *matHeaderCellDef>Completed At</th>
              <td mat-cell *matCellDef="let ingestion">{{ingestion.completed_at ? (ingestion.completed_at | date:'medium') : '-'}}</td>
            </ng-container>

            <ng-container matColumnDef="errorMessage">
              <th mat-header-cell *matHeaderCellDef>Error Message</th>
              <td mat-cell *matCellDef="let ingestion">{{ingestion.error_message || '-'}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let ingestion">
                <button mat-icon-button [routerLink]="['/ingestions', ingestion.id]">
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
          <div class="mt-3 text-center" *ngIf="ingestions.length==0">No Data Available!</div>

        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .ingestion-list-container {
      padding: 20px;
    }
    mat-card {
      margin-bottom: 20px;
    }
    .header-actions {
      margin-left: auto;
    }
    mat-card-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
    }
    .mat-column-actions {
      width: 80px;
      text-align: center;
    }
    .status-pending {
      color: #f57c00;
    }
    .status-processing {
      color: #1976d2;
    }
    .status-completed {
      color: #388e3c;
    }
    .status-failed {
      color: #d32f2f;
    }
  `]
})
export class IngestionListComponent implements OnInit {
  ingestions: Ingestion[] = [];
  displayedColumns: string[] = ['id', 'documentId', 'status', 'startedAt', 'completedAt', 'errorMessage', 'actions'];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIngestions();
  }

  loadIngestions(): void {
    this.apiService.get<Ingestion[]>('/api/ingestion').subscribe({
      next: (ingestions) => {
        this.ingestions = ingestions;
      },
      error: (error) => {
        console.error('Error loading ingestions:', error);
      }
    });
  }
} 