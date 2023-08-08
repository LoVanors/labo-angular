import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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
              private _authServ: AuthService) {
  }

  getTournamentsFromServer(params: {
    name?: string;
    category?: string;
    status?: string[];
    womenOnly?: boolean;
  }): Observable<TournamentIndexDTO> {
    let httpParams = new HttpParams();
    if (params.name) {
      httpParams = httpParams.set('Name', params.name);
    }
    if (params.category) {
      httpParams = httpParams.set('Category', params.category);
    }
    if (params.status) {
      params.status.forEach(sta => {
        httpParams = httpParams.append('Statuses', sta);
      })
    }
    if (params.womenOnly) {
      httpParams = httpParams.set('WomenOnly', params.womenOnly);
    }
    return this._http.get<TournamentIndexDTO>(`${environment.apiURL}/Tournament`,
      {params: httpParams});
  }

  addTournamentToServer(newTournament: TournamentAddDTO): Observable<TournamentAddDTO> {
    return this._http.post<TournamentAddDTO>(`${environment.apiURL}/Tournament`, newTournament);
  }

}
