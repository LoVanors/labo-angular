import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menuSub:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  constructor() { }

  get menuSub$(){
    return this._menuSub.asObservable();
  }

  showMenu(){
    this._menuSub.next(!this._menuSub.value);
  }

}
