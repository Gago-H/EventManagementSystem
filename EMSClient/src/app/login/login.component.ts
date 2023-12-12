import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { loginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Add this import statement

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  
  // Add private router property
  constructor(protected authService: AuthService, private http: HttpClient, private router: Router) { }

  login(): void {
    // Perform login logic

    // Set the redirect URL before navigating to login
    const redirectUrl = this.authService.getRedirectUrl();
    if (redirectUrl) {
      this.router.navigateByUrl(redirectUrl);
      this.authService.clearRedirectUrl();
    } else {
      // If no redirect URL is set, navigate to a default page
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  onSubmit() {
    let loginRequest: loginRequest = {
      userName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value
    };
    this.authService.login(loginRequest).subscribe({
      next: result => {
        console.log(result.message);

        this.login();
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
