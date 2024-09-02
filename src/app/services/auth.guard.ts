import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './app.service'; // Adjust the path to your actual AuthService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private appService: AppService, private router: Router) {}

  canActivate(): boolean {
    if (this.appService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/log']); // Redirect to login if not authenticated
      return false;
    }
  }
}
