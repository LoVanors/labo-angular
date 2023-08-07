import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TournamentAddDTO} from "../../models/tournamentAddDTO";
import {TournamentService} from "../../services/tournament.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.scss']
})
export class NewTournamentComponent {
  newTournamentForm: FormGroup;
  newTournament!: TournamentAddDTO;

  constructor(private _FB: FormBuilder,
              private _tournamentServ: TournamentService,
              private _router: Router) {
    this.newTournamentForm = this._FB.group(
      {
        name: [null, [Validators.required]],
        location: [null, [Validators.required]],
        minPlayers: [null, [Validators.required]],
        maxPlayers: [null, [Validators.required]],
        eloMin: [null, [Validators.required]],
        eloMax: [null, [Validators.required]],
        categories: this._FB.array([], [Validators.required]),
        womenOnly: [false],
        endOfRegistrationDate: [null, [Validators.required]]
      }
    )
  }

  get categoryFormArray(): FormArray {
    return this.newTournamentForm.get('categories') as FormArray;
  }

  updateCategories(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.categoryFormArray.push(this._FB.control(value));
    } else {
      const index = this.categoryFormArray.value.indexOf(value);
      if (index >= 0) {
        this.categoryFormArray.removeAt(index);
      }
    }
  }

  addNewTournament() {
    if (this.newTournamentForm.valid) {
      this.newTournament = this.newTournamentForm.value;
      this._tournamentServ.addTournamentToServer(this.newTournament).pipe(
        tap(() => this._router.navigateByUrl('/tournaments'))
      ).subscribe();
    }
  }
}
