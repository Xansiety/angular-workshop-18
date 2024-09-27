import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public login = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  public onSubmit() {

    if (!this.login.valid) {
      alert('Please fill in the form');
      return;
    }

    const email = this.login.get('email')!.value!;
    const password = this.login.get('password')!.value!;

    this.authService.login().subscribe({
      next: () => {

        console.log('Logged in');
        this.router.navigate(['/dashboard']);

      },
      error: () => {
        alert('Invalid credentials');
      },
    });



  }


}
