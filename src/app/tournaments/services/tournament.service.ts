import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {TournamentIndexDTO} from "../models/tournamentIndexDTO";
import {TournamentAddDTO} from "../models/tournamentAddDTO";
import {AuthService} from "../../core/services/auth.service";
import {TournamentDTO} from "../models/tournamentDTO";
import {TournamentDetailsDTO} from "../models/tournamentDetailsDTO";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
// Un service qui gère la communication avec une API pour les opérations liées aux tournois.

  constructor(private _http: HttpClient) {
  }

// Observable privé contenant la liste des tournois.
  private _tournaments$ = new BehaviorSubject<TournamentIndexDTO[]>([]);

// Propriété en lecture seule exposant l'observable pour la liste des tournois.
  get tournaments$(): Observable<TournamentIndexDTO[]> {
    return this._tournaments$.asObservable();
  }

// Méthode pour obtenir les tournois à partir du serveur en utilisant divers paramètres.
  getTournamentsFromServer(params: {
    name?: string;
    category?: string;
    status?: string[];
    womenOnly?: boolean;
  }): Observable<TournamentIndexDTO> {
    // Construction des paramètres HTTP pour la requête.
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

    // Effectue une requête GET à l'API pour obtenir les tournois en utilisant les paramètres.
    return this._http.get<TournamentIndexDTO>(`${environment.apiURL}/Tournament`, {params: httpParams})
  }

// Méthode pour ajouter un nouveau tournoi en utilisant une requête POST.
  addTournamentToServer(newTournament: TournamentAddDTO): Observable<TournamentAddDTO> {
    return this._http.post<TournamentAddDTO>(`${environment.apiURL}/Tournament`, newTournament);
  }

// Méthode pour obtenir les détails d'un tournoi à partir du serveur en utilisant son identifiant.
  getSingleTournamentFromServer(id: string): Observable<TournamentDetailsDTO> {
    return this._http.get<TournamentDetailsDTO>(`${environment.apiURL}/Tournament/${id}`)
  }

// Méthode pour supprimer un tournoi en utilisant une requête DELETE.
  deleteTournamentFromServer(id: string) {
    return this._http.delete<string>(`${environment.apiURL}/Tournament/${id}`)
  }

// Méthode pour obtenir la liste des tournois pouvant être supprimés.
  getTournamentToDelete() {
    return this._http.get<TournamentIndexDTO>(`${environment.apiURL}/Tournament`)
  }

// Méthode pour démarrer un tournoi en utilisant une requête PATCH.
  start(tournamentId: string) {
    return this._http.patch(`${environment.apiURL}/Tournament/${tournamentId}/start`, tournamentId)
  }

// Méthode pour passer à la prochaine manche d'un tournoi en utilisant une requête PATCH.
  nextRound(tournamentId: string) {
    return this._http.patch(`${environment.apiURL}/Tournament/${tournamentId}/nextRound`, tournamentId)
  }
}
