import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule,FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  app: any;
  latestUpdate:any;
  otherUpdates:any;
 
  query: string = '';
  suggestions: any[] = [];
  showSuggestions: boolean = false;
  constructor(private route: ActivatedRoute, private appService: AppService,private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
    const appId = this.route.snapshot.paramMap.get('id');
    if(appId!==null){
    this.getAppDetails(appId);
    
    }
    else{console.log("erreur")}

  }

  getAppDetails(appId: string): void {
    this.appService.getApplicationById(appId).subscribe((data) => {
      this.app = data;
      console.log(this.app);
      this.latestUpdate = this.app.updates[0]; 
    this.otherUpdates = this.app.updates.slice(1); 
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
    const url = `/detail/${suggestion._id}`;
    this.router.navigate([url]).then(() => {
      // Force a reload of the page after navigation
      window.location.reload();
    });
   
  }

  onBlur() {
    // Hide suggestions when focus is lost
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100); // Delay to allow click event on suggestion
  }

  downloadApk(url: string){
    const link = document.createElement('a');
    link.href = url;
    const fileName = url.split('/').pop() || 'downloaded-file';
  link.download = fileName;// This will use the file name from the URL
    link.type = 'application/vnd.android.package-archive';
    link.click();
  }
  readDocumentation(url: string){}
  
  update(){
    this.router.navigate([`/update/${this.app._id}`]);
  }
  onSeDeconnecter() {
    this.appService.logout();
    this.router.navigate(['/log']);
        console.log('Se Deconnecter clicked');
      }
      retour(){
        this.router.navigate(['/home']);
      }

}
