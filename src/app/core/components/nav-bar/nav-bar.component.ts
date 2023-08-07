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
   menu!:boolean;
   items!:Link[];
   connectedUser?: UserDTO;
   role?:string;

  constructor(private _menuServ:MenuService,
              private _authServ:AuthService) {
    if(this._authServ.getToken()){
    this.connectedUser = this._authServ.getToken()?.user;
    this.role = this.connectedUser?.role;
  }else{
      this.connectedUser=undefined;
      this.role=undefined;
    }
    this._menuServ.menuSub$.subscribe( result => this.menu=result);
  }

  ngOnInit(): void {
    if(this._authServ.getToken()){
      this.connectedUser = this._authServ.getToken()?.user;
      this.role = this.connectedUser?.role;
    }else{
      this.connectedUser=undefined;
      this.role=undefined;
    }
    this.items=[
      {
        label: 'Tournois',
        icon:'pi pi-sitemap',
        children:[
          {
            label: 'Liste des Tournois',
            icon: 'pi pi-sitemap',
            url:'/tournaments',
          },
          {
            label: 'Nouverau Tournoi',
            icon: 'pi pi-plus',
            url:'/tournaments/create',
          },
        ],
        showChildren: false,
      },
      {
        label: 'Members',
        icon:'pi pi-users',
        children:[
          {
            label: 'Nouveau Membre',
            icon: 'pi pi-user-plus',
            url: '/members/create'
          }
        ],
        showChildren: false,
      }
      ]
  }

  toggleChildren(link: Link):void{
    let currentState = link.showChildren;
    this.items.forEach(l => l.showChildren = false);
    link.showChildren=!currentState;
  }

  showMenu() {
    this._menuServ.showMenu();
  }

}
