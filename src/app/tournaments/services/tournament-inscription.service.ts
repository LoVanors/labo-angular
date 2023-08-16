import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../core/services/auth.service";
import {Observable} from "rxjs";
import {UserDTO} from "../../members/models/userDTO";
import {environment} from "../../environments/environment";
import {TournamentDTO} from "../models/tournamentDTO";

@Injectable({
  providedIn: 'root'
})
export class TournamentInscriptionService {
  // Un service qui gère la communication avec une API pour les opérations liées à l'inscription/désinscription à un tournoi.

// Propriété représentant l'utilisateur connecté.
  connectedUser?: UserDTO;

  constructor(private _http: HttpClient, private _authServ: AuthService) {
    // Vérifie si l'utilisateur est connecté en récupérant les informations depuis le service AuthService.
    // Si l'utilisateur est connecté, met à jour la propriété connectedUser, sinon la laisse comme undefined.
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }
  }

// Méthode pour s'inscrire à un tournoi en utilisant une requête POST.
  subscribeToTournament(id: string): Observable<TournamentDTO> {
    return this._http.post<TournamentDTO>(`${environment.apiURL}/TournamentInscription/${id}`, id);
  }

// Méthode pour se désinscrire d'un tournoi en utilisant une requête DELETE.
  unsubscribeFromTournament(id: string) {
    return this._http.delete(`${environment.apiURL}/TournamentInscription/${id}`);
  }
}
