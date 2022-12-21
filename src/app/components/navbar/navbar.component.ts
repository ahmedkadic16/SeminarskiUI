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
  public user:any=null;
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
    if(this.isLoggedIn()) {
      this.getUser(this.auth.getEmailLoggedIn());
    }
  }
  getUser(email:string) {
    this.api.getUserByEmail(email).subscribe(x=> this.user=x);
  }
  getNav() {
    return this.navBar.visible;
  }
  isLoggedIn():boolean {
    return this.auth.isLoggedIn();
  }
  logout() {
    this.user=null;
    this.auth.signOut();
  }

  getName():string {
    return this.user.firstName;
  }
}
