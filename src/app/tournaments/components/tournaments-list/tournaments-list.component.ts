import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {Observable, tap,} from "rxjs";
import {TournamentIndexDTO} from "../../models/tournamentIndexDTO";
import {TournamentDTO} from "../../models/tournamentDTO";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  tournamentsList$!: Observable<TournamentIndexDTO>;
  tournaments: TournamentDTO[]|null = [];
  filterByFormActive: boolean=false;
  filterByForm: FormGroup;
  filteredTournaments!: TournamentIndexDTO;

  constructor(private _tournamentsService: TournamentService,
              private _FB: FormBuilder,
              private _router: Router) {
    this.filterByForm = this._FB.group(
      {
        name: [null,[]],
        categories: [null,[]],
        status: this._FB.array([],[]),
        womenOnly: [null,[]]
      }
    )
  }

  ngOnInit(): void {
    const loginEvent = new CustomEvent('userLoggedIn');
    this.initObservables();

    document.dispatchEvent(loginEvent);

    document.addEventListener('userLoggedIn', () => {
      location.reload(); // Actualiser la page après la connexion
    });
  }


  private initObservables(){
    this.tournamentsList$ = this._tournamentsService.getTournamentsFromServer().pipe(
      tap( data => this.tournaments= data.results)
    );
  }

  filterForm() {
    this.filterByFormActive = !this.filterByFormActive;
  }

  findByFilter(){
    this.filteredTournaments = this.filterByForm.value;
    console.log(this.filteredTournaments);
  }

}
