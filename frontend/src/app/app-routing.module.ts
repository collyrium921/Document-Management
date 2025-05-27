import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UserRole } from './models/user.model';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./components/documents/documents.module').then(m => m.DocumentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.ADMIN }
  },
  {
    path: 'ingestions',
    loadChildren: () => import('./components/ingestions/ingestions.module').then(m => m.IngestionsModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'documents', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 