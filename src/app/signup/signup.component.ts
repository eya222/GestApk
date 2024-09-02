import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { User } from '../shared/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@sra-tunisie\.com$/)]],
      name: ['', Validators.required],
      fonction: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),

        ]
      ]
    });
  }

  ngOnInit(): void {}

  onSignUp(): void {
    if (this.signUpForm.valid) {
      const user: User = this.signUpForm.value;
      console.log(user)
      this.appService.signup(user).subscribe(response => {
        console.log('Sign-up successful:', response);
        this.router.navigate(['/log']);
      }, error => {
        console.error('Sign-up failed:', error);
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/log']);
  }
}
