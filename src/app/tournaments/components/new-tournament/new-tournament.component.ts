import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TournamentAddDTO} from "../../models/tournamentAddDTO";
import {TournamentService} from "../../services/tournament.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {maxPlayersValidator} from "../../../shared/validators/maxPlayersValidator";

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.scss']
})
export class NewTournamentComponent {
  // Formulaire de création de tournoi
  newTournamentForm: FormGroup;
  newTournament!: TournamentAddDTO;

  constructor(private _FB: FormBuilder,
              private _tournamentServ: TournamentService,
              private _router: Router) {
    // Initialisation du formulaire
    this.newTournamentForm = this._FB.group(
      {
        name: [null, [Validators.required]],
        location: [null, [Validators.required]],
        minPlayers: [null, [Validators.required,Validators.min(2)]],
        maxPlayers: [null, [Validators.required, maxPlayersValidator('minPlayers')]],
        eloMin: [null, [Validators.required]],
        eloMax: [null, [Validators.required]],
        categories: this._FB.array([], [Validators.required]),
        womenOnly: [false],
        endOfRegistrationDate: [null, [Validators.required]]
      }
    )
  }

// Getter pour accéder au FormArray 'categories'
  get categoryFormArray(): FormArray {
    return this.newTournamentForm.get('categories') as FormArray;
  }

// Met à jour la liste des catégories en fonction de la sélection de l'utilisateur
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

// Ajoute un nouveau tournoi lorsque le formulaire est valide
  addNewTournament() {
    if (this.newTournamentForm.valid) {
      this.newTournament = this.newTournamentForm.value;
      // Appelle le service pour ajouter le tournoi
      this._tournamentServ.addTournamentToServer(this.newTournament).pipe(
        tap(() => this._router.navigateByUrl('/tournaments'))
      ).subscribe();
    }
  }
}
