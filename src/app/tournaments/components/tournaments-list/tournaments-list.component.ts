import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {Observable, tap,} from "rxjs";
import {TournamentIndexDTO} from "../../models/tournamentIndexDTO";
import {TournamentDTO} from "../../models/tournamentDTO";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  tournamentsList$!: Observable<TournamentIndexDTO>;
  tournaments: TournamentDTO[]|null = [];
  searchFormActive: boolean=false;
  searchCtrl!: string;
  filteredOptions: string[] | undefined;
  searchTypeList: string[]=[];

  constructor(private _tournamentsService: TournamentService) { }

  ngOnInit(): void {
    this.initObservables();
  }


  private initObservables(){
    this.tournamentsList$ = this._tournamentsService.getTournamentsFromServer().pipe(
      tap( data => this.tournaments= data.results)
    );
  }

  searchForm() {
    this.searchFormActive = !this.searchFormActive;
  }

  filterOption($event: AutoCompleteCompleteEvent) {
    
  }
}
