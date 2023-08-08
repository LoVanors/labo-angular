import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {UserDTO} from "../members/models/userDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  connectedUser ?: UserDTO;

  constructor(private _authServ: AuthService) {
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }
  }

  ngOnInit(): void {
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }

    const logoutEvent = new CustomEvent('userLoggedOut');
    document.dispatchEvent(logoutEvent);

    document.addEventListener('userLoggedOut', () => {
      location.reload();

    });

    const loginEvent = new CustomEvent('userLoggedIn');

    document.dispatchEvent(loginEvent);

    document.addEventListener('userLoggedIn', () => {

      location.reload(); // Actualiser la page après la connexion
    });


  }


}
