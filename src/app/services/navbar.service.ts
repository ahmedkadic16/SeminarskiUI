import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible:boolean;

  constructor() {
    this.visible=true;
  }
  //controls
  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  //get
  getVisibility():boolean {
    return this.visible;
  }
}
