import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatchDTO} from "../models/matchDTO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
// Un service qui gère la communication avec une API pour obtenir des informations de match et mettre à jour les résultats.

  constructor(private _http: HttpClient) {
  }

// Méthode pour obtenir les matchs en fonction des paramètres fournis, tels que l'identifiant du tournoi et le round (facultatif).
  getMatch(params: {
    tournamentId: string,
    round?: number,
  }): Observable<MatchDTO[]> {

    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set("tournamentId", params.tournamentId)

    if (params.round) {
      httpParams = httpParams.set("round", params.round)
    }

    // Effectue une requête GET à l'API pour obtenir les matchs en utilisant les paramètres.
    return this._http.get<MatchDTO[]>(`${environment.apiURL}/Match`, {params: httpParams})
  }

// Méthode pour mettre à jour le résultat d'un match en utilisant une requête PATCH.
  result(id: number, result: string) {
    // Corps de la requête contenant le résultat du match.
    const body = {result: result};

    // En-têtes de la requête.
    const headers = {
      'Content-type': 'application/json'
    }

    // Effectue une requête PATCH à l'API pour mettre à jour le résultat du match spécifié.
    return this._http.patch(`${environment.apiURL}/Match/${id}/result`, body, {headers})
  }

}
