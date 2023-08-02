import {Component} from '@angular/core';
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
   menu!:boolean;

  constructor(private _menuServ:MenuService) {
    this._menuServ.menuSub$.subscribe( result => this.menu=result);
    console.log(this.menu)
  }



}
