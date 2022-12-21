import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  constructor(private navBar:NavbarService) {
  }
  ngOnInit() {
    this.navBar.show();
  }
}
