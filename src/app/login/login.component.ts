import {Component} from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDTO} from "../members/models/userDTO";
import {LoginDTO} from "../core/models/loginDTO";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Définition des propriétés de la classe

  // Formulaire de connexion
  loginForm: FormGroup;

  // Informations de connexion
  logs: LoginDTO = { username: '', password: '' };

  // Indicateur pour afficher ou masquer les informations de connexion
  connectionInfo: boolean = true;

  // Constructeur de la classe
  constructor(
    private _authServ: AuthService,
    private _FB: FormBuilder,
    private _router: Router
  ) {
    // Initialisation du formulaire de connexion
    this.loginForm = this._FB.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  // Fonction de connexion
  login() {
    if (this.loginForm.valid) {
      // Récupération des informations du formulaire
      this.logs.username = this.loginForm.get('username')?.value;
      this.logs.password = this.loginForm.get('password')?.value;

      // Appel au service d'authentification pour se connecter
      this._authServ.connect(this.logs.username, this.logs.password)
        .pipe(
          // Redirection vers la page d'accueil après la connexion réussie
          tap(() => this._router.navigateByUrl('/home'))
        )
        .subscribe(
          // Enregistrement du jeton d'authentification dans le stockage local
          (data) => {
            localStorage.setItem('token', JSON.stringify(data));
          }
        );
    } else {
      // Affichage des informations de connexion incorrectes
      this.connectionInfo = !this.connectionInfo;
    }
  }
}
