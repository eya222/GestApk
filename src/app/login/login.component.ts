import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { User } from '../shared/user.model';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterOutlet,HttpClientModule],
  providers:[],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(private router: Router,private fb: FormBuilder, private appService: AppService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  navigateToAbout() {
    this.router.navigate(['/sign']);
  }
  navigateTorecup() {
    this.router.navigate(['/recup']);
  }
  ngOnInit(): void {
   
}
  onSubmit() {
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      console.log(user)

      this.appService.login(user).subscribe(response => {
        console.log('Login successful:', response);
        this.router.navigate(['/home']);
        localStorage.setItem('authToken', 'your-token');
      }, error => {
        console.error('Login failed:', error);
        
        this.errorMessage = 'Incorrect email or password. Please try again.'; 
      });
    }
  }
}
