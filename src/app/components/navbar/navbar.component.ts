import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbar.service";
import {AuthService} from "../../services/auth.service";
import {UserStoreService} from "../../services/user-store.service";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  public fullName:string= "";
  public role:string="";

  constructor(private navBar:NavbarService,
              private auth:AuthService,
              private userStore:UserStoreService,
              private api:ApiService) { }

  ngOnInit(): void {
    this.navBar.show();

    this.userStore.getFullNameFromStore().subscribe(val => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
    this.userStore.getRoleFromStore().subscribe(val => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });
  }

  //login logout
  isLoggedIn():boolean {
    return this.auth.isLoggedIn();
  }
  logout() {
    this.auth.signOut();
  }

}
