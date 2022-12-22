import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl ="https://localhost:44391/api/User";
  constructor(private http:HttpClient) { }

  //getUser/s
  getUser():Observable<any> {
   return this.http.get<any>(this.baseUrl+"/getAllUsers");
  }
  getUserByEmail(email:string):Observable<any> {
      return this.http.get<any>(this.baseUrl+"/getUserByEmail?email="+email);
  }
}
