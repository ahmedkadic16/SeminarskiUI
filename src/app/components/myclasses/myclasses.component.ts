import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'app-myclasses',
  templateUrl: './myclasses.component.html',
  styleUrls: ['./myclasses.component.css']
})
export class MyclassesComponent  implements OnInit{
  public users:any = [];
  constructor(private api:ApiService,
              private nav:NavbarService) {
  }

  ngOnInit() {
    this.nav.show();
    this.getUsers();
  }

  getUsers() {
    this.api.getUser().subscribe(x=> this.users=x);
  }
}
