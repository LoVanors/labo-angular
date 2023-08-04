import { Component } from '@angular/core';
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menu!:boolean;

constructor(private _menuServ:MenuService) {
  this._menuServ.menuSub$.subscribe( result => this.menu=result);
}
  showMenu() {
    this._menuServ.showMenu();
    const button = document.querySelector('.menu-button');
    button!.classList.toggle('active');
  }

  logOut(){
  sessionStorage.removeItem("token")
  }


  protected readonly sessionStorage = sessionStorage;
}
