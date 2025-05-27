import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
  { path: '', redirectTo: 'documents', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 