import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';
import { environment } from 'src/environments/environment';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { loginResult} from './loginResult';
import { Router } from '@angular/router'; // Add this import statement

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  key = "comp584-token";
  private _authStatus = new Subject<boolean>();
  private redirectUrl: string | null = null;

  public authStatus = this._authStatus.asObservable();

  constructor(protected http: HttpClient, private router: Router) { }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    console.log(this.redirectUrl);
    return this.redirectUrl;
  }

  clearRedirectUrl(): void {
    this.redirectUrl = null;
  }

  init(){
    if (this.isAuthenticated()){
      this.setAuthStatus(true);
    }
  }

  getToken(): string | null{
    return localStorage.getItem(this.key);
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }
  
  setAuthStatus(isAuthenticated: boolean){
    this._authStatus.next(isAuthenticated);
  }

  login(loginItem: loginRequest) : Observable<loginResult>{
    let url = environment.baseUrl + '/api/Admin';
    console.log(url);

    return this.http.post<loginResult>(url, loginItem)
      .pipe(tap((loginResult: loginResult) => {
        if(loginResult.success && loginResult.token){
          localStorage.setItem(this.key, loginResult.token)
          this.setAuthStatus(true);

        }
      }));
  }

  logout(){
    localStorage.removeItem(this.key);
    this.setAuthStatus(false);
  }

}