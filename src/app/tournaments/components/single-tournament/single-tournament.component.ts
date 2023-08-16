import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute} from "@angular/router";
import {TournamentDetailsDTO} from "../../models/tournamentDetailsDTO";
import {delay, Observable, tap} from "rxjs";
import {MatchService} from "../../services/match.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {MatchDTO} from "../../models/matchDTO";
import {MatchResult} from "../../enums/matchResult";
import {UserDTO} from "../../../members/models/userDTO";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-single-tournament',
  templateUrl: './single-tournament.component.html',
  styleUrls: ['./single-tournament.component.scss']
})
export class SingleTournamentComponent implements OnInit {

  tournamentSub!: Observable<TournamentDetailsDTO>;
  matches?: MatchDTO[] | null;
  activeIndex: number = 0
  tournamentItems: MenuItem[] | undefined = []
  match!: MatchDTO;
  matchResults: string[] = Object.values(MatchResult);
  user!: UserDTO | undefined;
  currentRound: number = 1;

  resultForm: FormGroup;

  playerStats: {[playerId: string]: {wins: number; losses: number; draws:number}} = {}

  showSpinner: boolean = false;

  constructor(private _tournamentServ: TournamentService,
              private _activeRoute: ActivatedRoute,
              private _matchServ: MatchService,
              private _FB: FormBuilder,
              private _authServ: AuthService) {

    // Initialisation du formulaire de résultat
    this.resultForm = this._FB.group(
      {
        result: [null]
      }
    )

    // Récupération des informations de l'utilisateur connecté si un token existe
    if (this._authServ.getToken()) {
      this.user = this._authServ.getToken()?.user
    }
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    let tournamentId = this._activeRoute.snapshot.params['id']

    this._matchServ.getMatch({
      tournamentId,
      round: this.currentRound
    }).subscribe(data => {
      this.match = data[0]
    })

    // Récupération des détails du tournoi
    this.tournamentSub = this._tournamentServ.getSingleTournamentFromServer(tournamentId).pipe(
      tap(data => {
        this.matches = data.matches
        this.calculatePlayerStats()

        // Construction des éléments de menu pour chaque match du tournoi
        if (this.matches && this.tournamentItems?.length===0){

          this.matches.forEach(match => {
            this.tournamentItems?.push({
              label: `Tour ${ match.round}`
            })
          })
        }
      })
    )

  }

  // Méthode pour calculer les positions des joueurs
  calculatePlayerPositions(round: number): {playerId: string; position: number}[]{
    const playerPositions: { playerId: string; position: number}[] = [];

    const playerScores: {[playerId: string]: number} = {};

    for( const playerId in this.playerStats){
      playerScores[playerId] = this.calculateTotalScore(playerId)
    }

    const sortedPlayers = Object.keys(playerScores).sort((a,b) => playerScores[b] - playerScores[a]);

    let position = 1;
    for (const playerId of sortedPlayers){
      playerPositions.push({playerId,position});
      position++;
    }

    return playerPositions;
  }

  // Méthode pour obtenir la position d'un joueur
  getPlayerPosition(playerId: string,round: number): number
  {
    const playerPositions = this.calculatePlayerPositions(round);
    const playerPosition = playerPositions.find(position => position.playerId === playerId);
    return playerPosition? playerPosition.position : 0;
  }

  // Méthode pour calculer les statistiques des joueurs
  calculatePlayerStats() {
    this.playerStats = {};

    if(this.matches){
      for (const match of this.matches) {
        if (match.round <= this.currentRound) {
          // Mise à jour des statistiques pour le joueur blanc
          if (!this.playerStats[match.whiteId]) {
            this.playerStats[match.whiteId] = { wins: 0, losses: 0, draws: 0 };
          }
          if (match.result === 'WhiteWin') {
            this.playerStats[match.whiteId].wins++;
          } else if (match.result === 'BlackWin') {
            this.playerStats[match.whiteId].losses++;
          } else if (match.result === 'Draw'){
            this.playerStats[match.whiteId].draws++;
          }

          // Mise à jour des statistiques pour le joueur noir
          if (!this.playerStats[match.blackId]) {
            this.playerStats[match.blackId] = { wins: 0, losses: 0, draws: 0 };
          }
          if (match.result === 'BlackWin') {
            this.playerStats[match.blackId].wins++;
          } else if (match.result === 'WhiteWin') {
            this.playerStats[match.blackId].losses++;
          } else  if (match.result === 'Draw') {
            this.playerStats[match.blackId].draws++;
          }
        }
      }
    }

  }

  // Méthode appelée lors du changement de l'index actif dans le menu
  onActiveIndexChange($event: number, tournament: TournamentDetailsDTO) {
    this.activeIndex = $event

    if(tournament.currentRound === 2){
      this.currentRound = $event + 1
    }

    this.showSpinner=true;
    this._matchServ.getMatch({tournamentId:tournament.id, round:this.activeIndex+1}).subscribe(data => {
      this.match = data[0]
        this.showSpinner=false;
    })
    this.calculatePlayerStats();
  }

  // Méthode pour démarrer le tournoi
  start(tournamentId: string) {
    this._tournamentServ.start(tournamentId).pipe(
      tap(() => {
        this.showSpinner = true
        this._matchServ.getMatch({
          tournamentId,
          round: this.currentRound
        }).subscribe(data => {
          this.match = data[0]

        })
      }),
      delay(1000),
      tap(() => this.showSpinner = false)
    ).subscribe()
  }

  // Méthode pour calculer le score total d'un joueur
  calculateTotalScore(playerId: string): number {
    const stats = this.playerStats[playerId];
    if (!stats) {
      return 0;
    }

    const wins = stats.wins;
    const losses = stats.losses;
    const draws = stats.draws;

    let totalScore = wins - losses + (draws * 0.5);

    totalScore = Math.max(totalScore, 0);

    if (totalScore === 0 && draws > 0) {
      return 0.5;
    }

    return totalScore;
  }

  // Méthode pour soumettre le formulaire de résultat
  resultFormSubmit(matchId: number) {
    this.resultForm.get('result')?.markAsDirty(); // Mark the control as dirty to trigger ngSubmit
    this.resultForm.get('result')?.updateValueAndValidity(); // Update the control's validity
    let result = this.resultForm.get('result')?.value
    this._matchServ.result(matchId, result).pipe(
      tap(() => {
        if(this.currentRound < 2){
          let tournamentId = this._activeRoute.snapshot.params['id']
          this._matchServ.getMatch({
            tournamentId,
            round: this.currentRound
          }).subscribe(data => {
            console.log(data)
            this.match = data[0]
          })
        }
      })
    ).subscribe()

  }

  // Méthode pour passer au tour suivant
  nextRound(tournamentId: string) {
    this._tournamentServ.nextRound(tournamentId).pipe(
      tap(data => {
        if(this.currentRound < 2){
          this.currentRound++
          this.activeIndex++
        }

        this.showSpinner = true
        this._matchServ.getMatch({
          tournamentId,
          round: this.currentRound
        }).subscribe(data => {
          this.match = data[0]

        })
      }),
      delay(1000),
      tap(() => this.showSpinner = false)
    ).subscribe()
  }
}
