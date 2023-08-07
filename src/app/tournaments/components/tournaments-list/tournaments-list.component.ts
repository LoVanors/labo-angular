import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {delay, filter, Observable, tap,} from "rxjs";
import {TournamentIndexDTO} from "../../models/tournamentIndexDTO";
import {TournamentDTO} from "../../models/tournamentDTO";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TournamentStatus} from "../../enums/tournamentStatus";

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  tournamentsList$!: Observable<TournamentIndexDTO>;
  tournaments: TournamentDTO[] | null = [];
  filterByFormActive: boolean = false;
  filterByForm: FormGroup;
  spinner: boolean = false;

  constructor(private _tournamentsService: TournamentService,
              private _FB: FormBuilder,
              private _router: Router) {
    this.filterByForm = this._FB.group(
      {
        name: [null],
        categories: [null],
        status: [null],
        womenOnly: [null]
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


  private initObservables() {
    this.tournamentsList$ = this._tournamentsService.getTournamentsFromServer(
      {
        status: [TournamentStatus.WAITINGFORPLAYERS, TournamentStatus.INPROGRESS,TournamentStatus.CLOSED ],
      }
    ).pipe(
      tap(data => {this.tournaments = data.results
      console.log(data.results)})
    );
  }

  filterForm() {
    this.filterByFormActive = !this.filterByFormActive;
  }

  resetFilter() {
    this.filterByForm.reset();
    this.spinner=true;
    setInterval(()=>this.spinner=false, 1100);
    setInterval(()=>location.reload(), 1000);
  }

  findByFilter() {
    if (this.filterByForm.valid) {
      let name = this.filterByForm.get('name')?.value;
      let category = this.filterByForm.get('category')?.value === null ? null : this.filterByForm.get('category')?.value;
      let status = this.filterByForm.get('status')?.value;
      let selectedStatus: string[] = [];
      let womenOnly = this.filterByForm.get('womenOnly')?.value;

      if (status) {
        Object.keys(status).forEach(
          key => {
            selectedStatus.push(status[key].name);
          }
        );
      }

      this.tournamentsList$ = this._tournamentsService.getTournamentsFromServer(
        {
          name,
          category,
          status: selectedStatus,
          womenOnly
        }
      ).pipe(
        tap(data =>{ this.tournaments = data.results
          this.spinner=true}),
        delay(1000),
        tap(() => this.spinner=false)
      )
    }
  }


}
