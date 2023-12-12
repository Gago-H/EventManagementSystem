import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router'; // Add this import statement

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
    events: Event[] = [];
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
            this.fetchEvents();
        }
    }

    private fetchEvents(): void {
        this.http.get<Event[]>(environment.baseUrl + '/api/Event').subscribe({
            next: result => {
                this.events = result;
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
