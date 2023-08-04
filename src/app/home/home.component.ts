import { Component } from '@angular/core';
import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    username!:string;
    protected readonly sessionStorage = sessionStorage;

    constructor(private _authServ: AuthService) {
    }

}
