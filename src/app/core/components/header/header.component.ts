import { Component } from '@angular/core';
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

constructor(private _menuServ:MenuService) {}
  showMenu() {
    this._menuServ.showMenu();
    console.log((this._menuServ.menuSub))
  }
}
