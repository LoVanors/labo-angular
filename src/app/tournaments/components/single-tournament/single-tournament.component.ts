import {Component, OnInit} from '@angular/core';
import {TournamentDTO} from "../../models/tournamentDTO";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-tournament',
  templateUrl: './single-tournament.component.html',
  styleUrls: ['./single-tournament.component.scss']
})
export class SingleTournamentComponent implements OnInit{

  tournament!:TournamentDTO;

  constructor(private _tournamentServ : TournamentService,
              private _activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this._activeRoute.snapshot.params['id']
    this._tournamentServ.getSingleTournamentFromServer(id).subscribe(
      data =>  {
        if (data){
          this.tournament = data
        }
      }
    );
  }

}
