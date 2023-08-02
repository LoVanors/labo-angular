import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menuSub:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(true);
  constructor() { }

  get menuSub$(){
    return this._menuSub.asObservable();
  }

  get menuSub():boolean{
    return this._menuSub.value;
}
  showMenu(){
    this._menuSub.next(!this._menuSub.value);
    console.log(this._menuSub.value)
  }

}
