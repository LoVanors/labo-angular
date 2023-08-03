import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, delay, Observable, tap} from "rxjs";
import {TournamentDTO} from "../models/tournamentDTO";
import {environment} from "../../environments/environment";
import {TournamentIndexDTO} from "../models/tournamentIndexDTO";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private _http: HttpClient) { }

  // private _tournaments = new BehaviorSubject<TournamentIndexDTO>(undefined);

  // get tournaments$():Observable<TournamentIndexDTO>{
  //   return this._tournaments.asObservable();
  // }

  getTournamentsFromServer():Observable<TournamentIndexDTO> {
   return  this._http.get<TournamentIndexDTO>(`${environment.apiURL}/Tournament`);
  }

}
