import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../core/services/auth.service";
import {TournamentDetailsDTO} from "../models/tournamentDetailsDTO";
import {Observable} from "rxjs";
import {UserDTO} from "../../members/models/userDTO";
import {environment} from "../../environments/environment";
import {TournamentDTO} from "../models/tournamentDTO";
import {TournamentIndexDTO} from "../models/tournamentIndexDTO";

@Injectable({
  providedIn: 'root'
})
export class TournamentInscriptionService {
  connectedUser?: UserDTO;

  constructor(private _http: HttpClient,
              private _authServ: AuthService) {
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }

  }

  subscribeToTournament(id:string,userId:string):Observable<TournamentDTO>{
return this._http.post<TournamentDTO>(`${environment.apiURL}/TournamentInscription/${id}`,userId)
  }

  unsubscribeFromTournament(){

  }

}
