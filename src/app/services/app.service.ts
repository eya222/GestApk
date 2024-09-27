import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { Appli } from '../shared/appli.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

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
      return this.http.post<any>(`${this.apiUrl1}/up`, formData, {
        reportProgress: true,  // Enable progress tracking
        observe: 'events'      // Observe upload events
      }).pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              // Calculate the progress percentage
              const progress = Math.round((100 * event.loaded) / (event.total ?? 1));
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              // The upload is complete, return the response body
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
    }
  
    updateApplication(id: string,formData: FormData): Observable<Appli> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, formData, {
        reportProgress: true,  // Enable progress tracking
        observe: 'events'      // Observe upload events
      }).pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              // Calculate the progress percentage
              const progress = Math.round((100 * event.loaded) / (event.total ?? 1));
              return { status: 'progress', message: progress }; // Return progress status
            case HttpEventType.Response:
              // The upload is complete, return the response body
              return event.body; // Return the full response
            default:
              return `Unhandled event: ${event.type}`; // Handle unexpected events
          }
        })
      );
    }
    
    addUpdate(id: string|null, formData: FormData): Observable<any> {
      return this.http.post<any>(`${this.apiUrl1}/updates/${id}`, formData, {
        reportProgress: true,  // Enable progress tracking
        observe: 'events'      // Observe upload events
      }).pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / (event.total ?? 1));
              return { status: 'progress', message: progress }; // Emit progress event
            case HttpEventType.Response:
              return event; // Emit the final response event
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
    }
    
    logout(): void {
      localStorage.removeItem('authToken'); // Remove the token
      this.router.navigate(['/login']); // Redirect to login page
    }
    isAuthenticated(): boolean {
      return !!localStorage.getItem('authToken'); // Check if the token exists
    }
}