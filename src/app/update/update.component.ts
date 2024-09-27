import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Appli } from '../shared/appli.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterOutlet],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  isUploading: boolean = false; // Track upload status
  submitDisabled: boolean = false;
  progressValue = 0;
  selectedFiles: { [key: string]: File[] } = {
    apk: [],
    document: [],
    photos: [],
    demo: []
  };
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private AppService: AppService,private router: Router) {
    this.updateForm = this.fb.group({
      consultantTechnique: ['',Validators.required],
      consultantFonctionnel: ['',Validators.required],
      apk: [null,Validators.required],
      document: [null,Validators.required],
      demo: [null,Validators.required],
      photos: [null,Validators.required],
      date: [new Date().toISOString().substring(0, 10)]  
    });
  }
  appId = this.route.snapshot.paramMap.get('id');
    
  ngOnInit(): void {
    
    if(this.appId!==null){
      this.AppService.getApplicationById(this.appId).subscribe((appData: Appli) => {
        if (appData.updates && appData.updates.length > 0) {
          const latestUpdate = appData.updates[0]; 
  
          this.updateForm.patchValue({
            consultantTechnique: latestUpdate.consultantTechnique,
            consultantFonctionnel: latestUpdate.consultantFonctionnel
          });
  
         
        }
      });
    }
  
  }
  
  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateForm.patchValue({ [controlName]: file });
    }
  }

  onPhotosChange(event: any) {
    if (event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      this.updateForm.patchValue({ photos: files });
    }
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }
  
    this.isUploading = true; 
    this.submitDisabled = true; 
  
    const formData = new FormData();
    for (const key of Object.keys(this.updateForm.value)) {
      const value = this.updateForm.value[key];
      if (value instanceof File || Array.isArray(value)) {
        if (Array.isArray(value)) {
          value.forEach((file: File) => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      } else {
        formData.append(key, value);
      }
    }
  
    this.AppService.addUpdate(this.appId, formData).subscribe({
      next: (event: any) => {
        console.log('Event type:', event.type); // Debugging
  
        if (event.progress !== undefined) {
          this.progressValue = event.progress; // Update progress
        }
  
        if (event.event.type === HttpEventType.Response) {
          // Handle final response from backend
          this.isUploading = false;
          this.submitDisabled = false;
          console.log("heheheheh")
          
            console.log('Upload successful:', event.event.body);
            this.router.navigate(['/home']);
          
        }
      },
      error: (error: any) => {
        console.error('Update failed:', error); // Handle errors
        this.isUploading = false;
        this.submitDisabled = false;
      }
    });
  }
  
  

  
  onRetour(){
    this.router.navigate([`/detail/${this.appId}`])
  }
}
