import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {AuthService} from "../../services/auth.service";
import {UserDTO} from "../../../members/models/userDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu!: boolean;
  connectedUser ?: UserDTO;

  protected readonly localStorage = localStorage;

  constructor(private _menuServ: MenuService,
              private _authServ: AuthService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._menuServ.menuSub$.subscribe(result => this.menu = result);
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }
  }


  showMenu() {
    this._menuServ.showMenu();
  }

  logOut() {
    this._authServ.removeToken();
    this._router.navigateByUrl('').then(r => r);
    location.reload();
  }

}
