import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Appli } from '../../shared/appli.model';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,CardComponent,RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
 
  applications: Appli[] = [];
  query: string = '';
  suggestions: any[] = [];
  showSuggestions: boolean = false;
  constructor(private router: Router,private appService: AppService,private http: HttpClient) {}
  
  
  ngOnInit(): void {
    this.appService.getApplications().subscribe((data: Appli[]) => {
      this.applications = data;
    }); 
  }

  onInputChange() {
    if (this.query.trim()) {
      this.http.get<any[]>(`http://localhost:3000/apk/suggestions?query=${this.query}`)
        .subscribe(data => {
          console.log(data)
          this.suggestions = data;
          this.showSuggestions = true;
        }, error => {
          console.error('Error:', error);
          this.suggestions = [];
        });
    } else {
      console.log("nothing ")
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }
  onSelect(suggestion: any) {
    this.router.navigate([`/detail/${suggestion._id}`])
   
  }

  onBlur() {
    // Hide suggestions when focus is lost
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100); // Delay to allow click event on suggestion
  }


  

  onAjouter() {
    this.router.navigate(['/add']);
    console.log('Ajouter clicked');
  }

  onSeDeconnecter() {
this.appService.logout();
this.router.navigate(['/log']);
    console.log('Se Deconnecter clicked');
  }

}
