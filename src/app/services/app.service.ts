import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { Appli } from '../shared/appli.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpEvent } from '@angular/common/http'; // <-- Add this import
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
  
       // Handle the HTTP event to calculate progress
       private getEventMessage(event: HttpEvent<any>): { progress: number, event: HttpEvent<any> } {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = event.total ? Math.round((100 * event.loaded) / event.total) : 0;
            return { progress, event };
    
          case HttpEventType.Response:
            return { progress: 100, event };
    
          default:
            return { progress: 0, event };
        }
      }
    
      // Handle error
      private handleError(error: any): Observable<never> {
        console.error('Upload failed:', error);
        throw new Error('File upload failed, please try again later.');
      }
    
      createApplication(formData: FormData): Observable<{ progress: number, event: HttpEvent<any> }> {
        return this.http.post(`${this.apiUrl1}/up`, formData, {
          reportProgress: true, 
          observe: 'events'      
        }).pipe(
          map(event => this.getEventMessage(event)),
          catchError(this.handleError)
        );
      }
  
   
    
    
    addUpdate(id: string | null, formData: FormData): Observable<any> {
      return this.http.post<any>(`${this.apiUrl1}/updates/${id}`, formData, {
        reportProgress: true,
        observe: 'events'
    }).pipe(
        map(event => this.getEventMessage(event)),
        catchError(this.handleError)
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