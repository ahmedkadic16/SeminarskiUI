import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl ="https://localhost:44391/api/User";
  private userPayload:any;
  private emailLoggedIn="";
  constructor(private httpClient:HttpClient,
              private router:Router) {
    this.userPayload = this.decodedToken();
  }

  //emailloggedin
  public getEmailLoggedIn() {
    return this.emailLoggedIn;
  }
  public setEmailLoggedIn(email:string) {
    this.emailLoggedIn=email;
  }

  //login signup signout
  signUp(userObj:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl+"/register",userObj)
  }
  login(loginObj:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl+"/authenticate",loginObj)
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/homepage']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); //if token == null => false ; true
  }

  //token
  storeToken(tokenValue:string) {
    localStorage.setItem('token',tokenValue)
  }
  getToken() {
    return localStorage.getItem('token');
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    //console.log("token"+jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);
  }

  //get payload from token
  getFullNameFromToken() {
      if(this.userPayload)
        return this.userPayload.unique_name;
  }
  getEmailFromToken() {
    if(this.userPayload)
      return this.userPayload.email;
  }
  getRoleFromToken() {
    if(this.userPayload)
      return this.userPayload.role;
  }
}
