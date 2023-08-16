import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {delay, filter, Observable, tap,} from "rxjs";
import {TournamentIndexDTO} from "../../models/tournamentIndexDTO";
import {TournamentDTO} from "../../models/tournamentDTO";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TournamentStatus} from "../../enums/tournamentStatus";
import {UserDTO} from "../../../members/models/userDTO";
import {AuthService} from "../../../core/services/auth.service";
import {TournamentInscriptionService} from "../../services/tournament-inscription.service";

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
  isCheckedClosed: boolean = false
  isCheckedWaiting: boolean = false
  isCheckedProgress: boolean = false

  connectedUser ?: UserDTO;

  constructor(private _tournamentsService: TournamentService,
              private _FB: FormBuilder,
              private _TIServ: TournamentInscriptionService,
              private _authServ: AuthService) {
    this.filterByForm = this._FB.group(
      {
        name: [],
        category: [],
        status: this._FB.array([]),
        womenOnly: []
      }
    )

    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }
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
        status: [TournamentStatus.WAITINGFORPLAYERS, TournamentStatus.INPROGRESS],
      }
    ).pipe(
      tap(data => {
        this.tournaments = data.results
        console.log(data.results)
      })
    );
  }

  filterForm() {
    this.filterByFormActive = !this.filterByFormActive;
  }

  resetFilter() {
    this.filterByForm.reset();
    this.spinner = true;
    setInterval(() => this.spinner = false, 1100);
    setInterval(() => location.reload(), 1000);
  }

  findByFilter() {
    if (this.filterByForm.valid) {
      let name = this.filterByForm.get('name')?.value;
      let category = this.filterByForm.get('category')?.value === null ? null : this.filterByForm.get('category')?.value;
      let statuses: string[] = []

      this.statusesFormArray.controls.forEach(control => {
        if (control.value) {
          statuses.push(control.value);
        }
      });

      let womenOnly = this.filterByForm.get('womenOnly')?.value;
      // status.push(this.filterByForm.get('status')?.value)
      console.log(this.filterByForm.value)

      if (statuses.length <= 0) {
        statuses.push(...[TournamentStatus.WAITINGFORPLAYERS, TournamentStatus.INPROGRESS, TournamentStatus.CLOSED])
      }

      this.tournamentsList$ = this._tournamentsService.getTournamentsFromServer(
        {
          name,
          category,
          status: statuses,
          womenOnly
        }
      ).pipe(
        tap(data => {
          this.tournaments = data.results
          this.spinner = true
          let existingValue: string[] = []
          this.isCheckedClosed = false
          this.isCheckedProgress = false
          this.isCheckedWaiting = false

          let test = this.filterByForm.get('status')?.value

          if (test.length > 0) {
            console.log("ici")
            existingValue = this.filterByForm.get('status')?.value
            const statusesFormArray = this.filterByForm.get('status') as FormArray;

            statusesFormArray.controls.forEach(control => {
              const value = control.value;
              console.log(value)
              if (existingValue.includes("Closed")) {
                this.isCheckedClosed = true // Cocher la case si la valeur existe dans le tableau existingStatusValues
              }
              if (existingValue.includes("WaitingForPlayers")) {
                this.isCheckedWaiting = true
              }
              if (existingValue.includes("InProgress")) {
                this.isCheckedProgress = true
              }
            });

          }

        }),
        delay(1000),
        tap(() => {
          this.spinner = false
          console.log("ici")
        })
      )
    }
  }

  get statusesFormArray(): FormArray {
    return this.filterByForm.get('status') as FormArray;
  }

  updateStatuses(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.statusesFormArray.push(this._FB.control(value));
    } else {
      const index = this.statusesFormArray.value.indexOf(value);
      if (index >= 0) {
        this.statusesFormArray.removeAt(index);
      }
    }
  }

  deleteTournament(id: string) {
    this._tournamentsService.deleteTournamentFromServer(id).subscribe(
      () => {
        this._tournamentsService.getTournamentToDelete();
      }
    );
    this.spinner = true;
    setInterval(() => this.spinner = false, 1100);
    setInterval(() => location.reload(), 1000);
  }

  sub(id: string) {
    this._TIServ.subscribeToTournament(id).subscribe();
    this.spinner = true;
    setInterval(() => this.spinner = false, 1100)
    setInterval(() => location.reload(), 1000);
  }

  unsub(id: string) {
    this._TIServ.unsubscribeFromTournament(id).subscribe();
    this.spinner = true;
    setInterval(() => this.spinner = false, 1100)
    setInterval(() => location.reload(), 1000);
  }
}
