import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {Link} from "../../models/link";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
   menu!:boolean;
   items!:Link[];

  constructor(private _menuServ:MenuService) {
    this._menuServ.menuSub$.subscribe( result => this.menu=result);
  }

  ngOnInit(): void {
    this.items=[
      {
        label: 'Accueil',
        icon:'pi pi-home',
        url: ''
      },
      {
        label: 'Tournois',
        icon:'pi pi-sitemap',
        children:[
          {
            label: 'Liste des Tournois',
            icon: 'pi pi-sitemap',
            url:'/tournaments',
          },{
            label: 'Chercher un Tournoi',
            icon: 'pi pi-search',
            url:'/tournaments/:id',
          },{
            label: 'Modifier un Tournoi',
            icon: 'pi pi-pencil',
            url:'/tournaments/edit',
          },{
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
          label: 'Liste des Membres',
          icon: 'pi pi-users',
          url: '/members'
          },
          {
            label: 'Profil',
            icon: 'pi pi-user',
            url: '/members/:id'
          },
          {
            label: 'Modifier Profil',
            icon: 'pi pi-user-edit',
            url: '/members/edit'
          },
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
}
