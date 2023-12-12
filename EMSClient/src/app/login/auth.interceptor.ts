import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authService.getToken();

    if(token) {
      request = request.clone({
        setHeaders: {
          Authenthication: `Bearer ${token}`,
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        //only catch 401
        console.log(error);
        if(error instanceof HttpErrorResponse && error.status === 401){
          this.authService.logout();
          this.router.navigate(["login"]);
        }
        return throwError(() => error);
      })
    );
  }
}