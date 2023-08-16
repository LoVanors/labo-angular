import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {TokenDTO} from "../models/tokenDTO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _tokenSub: BehaviorSubject<TokenDTO | null>; // Un BehaviorSubject pour suivre l'état du token
  private userLoggedInSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject pour suivre l'état de la connexion
  userLoggedin$: Observable<boolean> = this.userLoggedInSubject.asObservable(); // Observable pour observer l'état de connexion

  constructor(private _http: HttpClient) {
    const sessionToken = localStorage.getItem("token");
    // Initialise le BehaviorSubject avec le token stocké en session ou null
    this._tokenSub = new BehaviorSubject<TokenDTO | null>(sessionToken ? JSON.parse(sessionToken) : null);
  }

  // Méthode pour établir une connexion
  connect(username: string, password: string): Observable<TokenDTO> {
    let loginInfo = { username, password };
    // Effectue une requête POST vers l'API de connexion
    return this._http.post<TokenDTO>(`${environment.apiURL}/login`, loginInfo);
  }

  // Méthode pour obtenir le token actuel
  getToken() {
    return this._tokenSub.getValue();
  }

  // Méthode pour supprimer le token et déconnecter l'utilisateur
  removeToken() {
    localStorage.removeItem("token"); // Supprime le token du stockage local
    this._tokenSub.next(null); // Notifie les observateurs que le token a été supprimé
  }

}
