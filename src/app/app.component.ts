import {Component, OnInit} from '@angular/core';
import {NavbarService} from "./services/navbar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Seminarski';

  constructor(public navBar: NavbarService) {
  }

  ngOnInit() {
    this.navBar.show();
  }
}

