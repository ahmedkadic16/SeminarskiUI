import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");

  constructor() { }

  //Role
  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  public setRoleForStore(role:string) {
    this.role$.next(role);
  }
  //FullName
  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(unique_name:string) {
    this.fullName$.next(unique_name);
  }
  //Email
  public getEmailFromStore() {
    return this.email$.asObservable();
  }
  public setEmailForStore(email:string) {
    this.email$.next(email);
  }
}
