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
  connectedUser ?: UserDTO; // Variable pour stocker les données de l'utilisateur connecté

  constructor(private _authServ: AuthService) {
    // Dans le constructeur, vérifie si un token d'authentification existe
    // Si oui, récupère les données de l'utilisateur et les assigne à connectedUser
    // Sinon, assigne undefined à connectedUser
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }
  }

  ngOnInit(): void {
    // Au démarrage du composant, effectue des actions liées à la connexion et à la déconnexion

    // Vérifie à nouveau si un token d'authentification existe
    // Si oui, récupère les données de l'utilisateur et les assigne à connectedUser
    // Sinon, assigne undefined à connectedUser
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }

    // Crée un nouvel événement personnalisé 'userLoggedOut'
    const logoutEvent = new CustomEvent('userLoggedOut');

    // Dispatch l'événement 'userLoggedOut'
    document.dispatchEvent(logoutEvent);

    // Écoute l'événement 'userLoggedOut' et actualise la page lorsque cela se produit
    document.addEventListener('userLoggedOut', () => {
      location.reload();
    });

    // Crée un nouvel événement personnalisé 'userLoggedIn'
    const loginEvent = new CustomEvent('userLoggedIn');

    // Dispatch l'événement 'userLoggedIn'
    document.dispatchEvent(loginEvent);

    // Écoute l'événement 'userLoggedIn' et actualise la page lorsque cela se produit
    document.addEventListener('userLoggedIn', () => {
      location.reload(); // Actualiser la page après la connexion
    });
  }

}
