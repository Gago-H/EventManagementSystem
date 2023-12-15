import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from './participants';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; // Add this import statement

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
    participants: Participant[] = [];
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
            this.fetchParticipants();
        }
    }

    private fetchParticipants(): void {
        this.http.get<Participant[]>(environment.baseUrl + '/api/Event/Participants').subscribe({
            next: result => {
                this.participants = result;
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
