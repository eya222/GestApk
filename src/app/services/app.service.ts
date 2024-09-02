import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { Appli } from '../shared/appli.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:3000/users';
  private apiUrl1 = 'http://localhost:3000/apk';
    constructor(private http: HttpClient,private router: Router) { }

    signup(user: User): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/signup`, user);
    }
  
    login(user: User): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/login`, user);
    }
  
  
    getApplications(): Observable<Appli[]> {
      return this.http.get<Appli[]>(`${this.apiUrl1}/all`);
    }
  
    getApplicationById(id: string): Observable<Appli> {
      return this.http.get<Appli>(`${this.apiUrl1}/${id}`);
    }
  
    createApplication(formData: FormData): Observable<any> {
      return this.http.post<any>(`${this.apiUrl1}/up`, formData);
    }
  
    updateApplication(id: string, application: Appli): Observable<Appli> {
      return this.http.put<Appli>(`${this.apiUrl}/${id}`, application);
    }
    
    addUpdate(Id: string|null, update: any): Observable<any> {
      return this.http.post(`${this.apiUrl1}/updates/${Id}`, update);
    }
    logout(): void {
      localStorage.removeItem('authToken'); // Remove the token
      this.router.navigate(['/login']); // Redirect to login page
    }
    isAuthenticated(): boolean {
      return !!localStorage.getItem('authToken'); // Check if the token exists
    }
}