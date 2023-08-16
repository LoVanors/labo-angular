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
  menu!: boolean; // Déclare une propriété pour suivre l'état du menu
  connectedUser?: UserDTO; // Déclare une propriété pour stocker les informations de l'utilisateur connecté (optionnel)

  protected readonly localStorage = localStorage; // Crée une référence locale à l'objet localStorage

  constructor(
    private _menuServ: MenuService, // Injecte le service MenuService
    private _authServ: AuthService, // Injecte le service AuthService
    private _router: Router // Injecte le service Router
  ) {}

  ngOnInit(): void {
    // Souscrit aux modifications de l'état du menu
    this._menuServ.menuSub$.subscribe(result => this.menu = result);

    // Vérifie si un token d'authentification existe
    if (this._authServ.getToken()) {
      // Si un token existe, extrait les informations de l'utilisateur à partir du token
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      // Si aucun token n'existe, indique que l'utilisateur n'est pas connecté
      this.connectedUser = undefined;
    }
  }

  // Méthode pour afficher le menu
  showMenu() {
    this._menuServ.showMenu();
  }

  // Méthode pour se déconnecter
  logOut() {
    // Supprime le token d'authentification
    this._authServ.removeToken();

    // Navigue vers la page d'accueil (assumant que le chemin vide correspond à la page d'accueil)
    this._router.navigateByUrl('').then(r => r);

    // Recharge la page pour mettre à jour l'état de l'application
    location.reload();
  }
}
