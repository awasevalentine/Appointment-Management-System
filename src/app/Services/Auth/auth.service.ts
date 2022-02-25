import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginData, JwtToken } from 'src/app/Models/Interface/User/login.interface';
import { RegisterationData } from 'src/app/Models/Interface/User/register.interface';
import { UserDetailsFromJwtToken } from 'src/app/Models/Interface/User/user-details-from-jwt.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authApiUrl = environment.authApiUrl;
  userApiUrl = environment.userApiUrl;

  constructor(private http: HttpClient, private router: Router) { }


  public getUsers(): Observable<any>{
    return this.http.get<any>(`${this.userApiUrl}/users`)
  }
  
//methode for registering or creating a user
  public createUser(userData: RegisterationData): Observable<any>{
    return this.http.post<any>(`${this.userApiUrl}/register`, userData)
    }

    //methode for registering or creating a user
  public createUserWithGmail(): Observable<any>{
    return this.http.get<any>(`${this.userApiUrl}`)
    }


  // User login endpoint interface
  public logInUser(userData: LoginData): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.authApiUrl}/login`, userData);
  }


  // User generated token saved to local stroage
  public saveGeneratedToken(token: any): void {
    localStorage.setItem('user-token', token);
  }



  // Retrieving token from localStorage

  public getTokenFromLocalStorage(): any {
   let token = localStorage.getItem('user-token')
    return token;
  }


  // // Splitting token in order to extract user details
  // public getUserDetailsFromJwtToken(): UserDetailsFromJwtToken{
  //   let payload;
  //   const token = this.getTokenFromLocalStorage();
  //   if(token){
  //     payload = token.split('.')[1];
  //     payload = window.atob(payload);
  //     return JSON.parse(payload);
  //   }
  //   // else {
  //   //   // throw new Error("No token found!")
  //   // }
  // }

   // Splitting token in order to extract user details
   public getUserDetailsFromJwtToken(){
    let payload;
    const token = this.getTokenFromLocalStorage();
    if(token){
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }
  }

  

// Returning a bearer user name from splitted token
  getUser(): any {
    const user = this.getUserDetailsFromJwtToken();
    console.log("This is form the service -> ",user)
    if (user) {
      return user.fullName;
    } else {
      return null;
    }
    }

    // Returning a bearer user email from splitted token
  getUserId(): any {
    const user = this.getUserDetailsFromJwtToken();
    if (user) {
      return user.userId;
    } else {
      return null;
    }
    }


  // Method for checking user logged in state
  public isAuthenticated(): boolean {
    const user = this.getUserDetailsFromJwtToken();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


   // when this is true, the login/signup element on the header changes to person icon
   isLoggedInUser(){
    if(!this.isAuthenticated()){
      return this.router.navigateByUrl('/login');
    }else {
      return true
        // return this.router.navigateByUrl('/dashboard/home');
      
    }
  }


  // Method to log a particular user out
  public logOutUser(): void {
    localStorage.removeItem('user-token');
    this.router.navigateByUrl('/login');
  }
  

  userLogin() {
    this.router.navigateByUrl('/login');
  }


}
