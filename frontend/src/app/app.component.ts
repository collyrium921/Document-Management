import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  constructor(public authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.hasRole("admin");
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
