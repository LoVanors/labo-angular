import { Component } from '@angular/core';
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menu!:boolean;
  connected!:boolean;
constructor(private _menuServ:MenuService) {
  this._menuServ.menuSub$.subscribe( result => this.menu=result);
}
  test(){
    this.connected=!this.connected;
  }
  showMenu() {
    this._menuServ.showMenu();
  }
}
