import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Appli } from '../shared/appli.model';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterOutlet],
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.css'
})
export class AjouterComponent implements OnInit{
  uploadForm: FormGroup;
  selectedFiles: { [key: string]: File[] } = {
    apk: [],
    document: [],
    photos: [],
    demo: []
  };
  ngOnInit(): void {
  }

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      CTech:['', Validators.required],
      CFonc:['', Validators.required],
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
    console.log('Form Values:', this.uploadForm.value);
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
    // Logging FormData keys and values
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.appService.createApplication(formData).subscribe(response => {
      console.log('Upload successful:', response);
      this.router.navigate(['/home']);
    }, error => {
      console.error('Upload failed:', error);
    });
  }
  onRetour(){
    this.router.navigate(['/home'])
  }
  
}
