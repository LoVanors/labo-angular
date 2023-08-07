import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TournamentIndexDTO} from "../models/tournamentIndexDTO";
import {TournamentAddDTO} from "../models/tournamentAddDTO";
import {AuthService} from "../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private _http: HttpClient,
              private _authServ: AuthService) { }

  getTournamentsFromServer():Observable<TournamentIndexDTO> {
   return  this._http.get<TournamentIndexDTO>(`${environment.apiURL}/Tournament`);
  }

  addTournamentToServer(newTournament: TournamentAddDTO):Observable<TournamentAddDTO>{
    return this._http.post<TournamentAddDTO>(`${environment.apiURL}/Tournament`, newTournament);
  }

}
