import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  signInWithGoogle(): void {
    console.log('Google login initiated');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      console.log('Google User:', user);
      localStorage.setItem('google_user', JSON.stringify(user));
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      console.error('Google Sign-In Error:', err);
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login Form Value:', this.loginForm.value);
      // Handle login logic here
      this.router.navigate(['/dashboard']);
    }
  }
}
