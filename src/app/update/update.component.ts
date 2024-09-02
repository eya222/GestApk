import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterOutlet],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  
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
      date: [new Date().toISOString().substring(0, 10)]  // Automatically set the current date
    });
  }
  appId = this.route.snapshot.paramMap.get('id');
    
  ngOnInit(): void {
    
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
    console.log('Form Values:', this.updateForm.value);
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
    // Logging FormData keys and values
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.AppService.addUpdate(this.appId,formData).subscribe(response => {
      console.log('Upload successful:', response);
      this.router.navigate([`/detail/${this.appId}`]);
    }, error => {
      console.error('Upload failed:', error);
    });
  }
  onRetour(){
    this.router.navigate([`/detail/${this.appId}`])
  }
}
