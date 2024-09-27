import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Ensure CommonModule is imported
@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css'],
})
export class AjouterComponent implements OnInit {
  uploadForm: FormGroup;
  isUploading: boolean = false; // Track upload status
  submitDisabled: boolean = false;
 
  progressValue = 0;
  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      CTech: ['', Validators.required],
      CFonc: ['', Validators.required],
      name: ['', Validators.required],
      client: ['', Validators.required],
      description: ['', Validators.required],
      apk: [null, Validators.required],
      document: [null, Validators.required],
      photos: [null, Validators.required],
      demo: [null, Validators.required],
      date: [new Date().toISOString().substring(0, 10)]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({ [controlName]: file });
    }
  }

  onPhotosChange(event: any) {
    if (event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      this.uploadForm.patchValue({ photos: files });
    }
  }
  onSubmit() {
    if (this.uploadForm.invalid) {
      return;
    }
  
    this.isUploading = true;
    this.submitDisabled = true;
  
    const formData = new FormData();
    for (const key of Object.keys(this.uploadForm.value)) {
      const value = this.uploadForm.value[key];
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
  
    this.appService.createApplication(formData).subscribe({
      next: (event: any) => {
        console.log('Event in submit:', event); // Log every event in the subscription
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
        console.error('Upload failed:', error); // Log errors
        this.isUploading = false;
        this.submitDisabled = false;
      }
    });
  }
  
  
  onRetour() {
    if (!this.isUploading) {
      this.router.navigate(['/home']);
    }
  }
}
