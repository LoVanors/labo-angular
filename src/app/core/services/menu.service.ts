import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
// Classe responsable de la gestion de l'état du menu
export class MenuService {

  private _menuSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // BehaviorSubject pour suivre l'état du menu

  // Constructeur de la classe
  constructor() { }

  // Propriété en lecture seule pour exposer l'observable de l'état du menu
  get menuSub$() {
    return this._menuSub.asObservable();
  }

  // Méthode pour afficher ou masquer le menu
  showMenu() {
    // Inverse la valeur actuelle de l'état du menu (true devient false, et vice versa)
    this._menuSub.next(!this._menuSub.value);
  }
}
