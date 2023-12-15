import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; // Add this import statement
import { Entry } from './entries';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent {
  entries: Entry[] = [];
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  redirectToLogin(): void {
      // Set the redirect URL before navigating to login
      this.authService.setRedirectUrl(this.router.url);
      this.router.navigate(['/login']);
  }

  ngOnInit(): void {
      // Check user authentication status
      this.isLoggedIn = this.authService.isAuthenticated(); // Fix the method name

      console.log('isLoggedIn:', this.isLoggedIn);

      // Fetch events only if the user is logged in
      if (this.isLoggedIn) {
          this.fetchEntries();
      }
  }

  private fetchEntries(): void {
      this.http.get<Entry[]>(environment.baseUrl + '/api/Event/Entries').subscribe({
          next: result => {
              this.entries = result;
          },
          error: error => {
              console.error(error);
          }
      });
  }
}
