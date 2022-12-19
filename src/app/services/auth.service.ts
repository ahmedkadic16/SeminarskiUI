import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl ="https://localhost:44391/api/User";
  constructor(private httpClient:HttpClient)
  { }

  signUp(userObj:any): Observable<any> {
  return this.httpClient.post<any>(this.baseUrl+"/register",userObj)
  }

  login(loginObj:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl+"/authenticate",loginObj)

  }

}
