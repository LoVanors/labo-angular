import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {Link} from "../../models/link";
import {AuthService} from "../../services/auth.service";
import {UserDTO} from "../../../members/models/userDTO";
import {UserRole} from "../../../members/enums/userRole";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  menu!: boolean;
  items!: Link[]; // Tableau d'objets Link pour stocker les éléments de menu
  connectedUser?: UserDTO;
  role?: string;

  constructor(
    private _menuServ: MenuService, // Injecte le service MenuService
    private _authServ: AuthService // Injecte le service AuthService
  ) {
    // Vérifie si un token d'authentification existe
    if (this._authServ.getToken()) {
      // Si un token existe, extrait les informations de l'utilisateur à partir du token
      this.connectedUser = this._authServ.getToken()?.user;
      this.role = this.connectedUser?.role;
    } else {
      // Si aucun token n'existe, indique que l'utilisateur n'est pas connecté
      this.connectedUser = undefined;
      this.role = undefined;
    }
    // Souscrit aux modifications de l'état du menu
    this._menuServ.menuSub$.subscribe(result => this.menu = result);
  }

  ngOnInit(): void {
    // Vérifie si un token d'authentification existe
    if (this._authServ.getToken()) {
      // Si un token existe, extrait les informations de l'utilisateur à partir du token
      this.connectedUser = this._authServ.getToken()?.user;
      this.role = this.connectedUser?.role;
    } else {
      // Si aucun token n'existe, indique que l'utilisateur n'est pas connecté
      this.connectedUser = undefined;
      this.role = undefined;
    }

    // Initialise le tableau 'items' avec les éléments de menu
    this.items = [
      {
        label: 'Tournois',
        icon: 'pi pi-sitemap',
        children: [
          {
            label: 'Liste des Tournois',
            icon: 'pi pi-sitemap',
            url: '/tournaments',
          },
          {
            label: 'Nouveau Tournoi',
            icon: 'pi pi-plus',
            url: '/tournaments/create',
          },
        ],
        showChildren: false,
      },
      {
        label: 'Members',
        icon: 'pi pi-users',
        children: [
          {
            label: 'Nouveau Membre',
            icon: 'pi pi-user-plus',
            url: '/members/create',
          },
        ],
        showChildren: false,
      },
    ];
  }

  // Méthode pour basculer l'affichage des éléments enfants du menu
  toggleChildren(link: Link): void {
    let currentState = link.showChildren;
    this.items.forEach(l => (l.showChildren = false));
    link.showChildren = !currentState;
  }

  // Méthode pour afficher le menu
  showMenu() {
    this._menuServ.showMenu();
  }
}
