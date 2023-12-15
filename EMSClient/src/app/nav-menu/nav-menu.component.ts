import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  private destroySubject = new Subject();

  constructor(private authService: AuthService, private router: Router) {
    // this.isLoggedIn = authService.isAuthenicated();
    this.authService.authStatus.pipe(takeUntil(this.destroySubject))
      .subscribe(result => {
        // console.log(Is logged in changed to ${isLoggedIn})
        this.isLoggedIn = result;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  onLogout() {

    console.log('User logged out');
    this.authService.logout();

    // this.isLoggedIn = false; 
  }

}