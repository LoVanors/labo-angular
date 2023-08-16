import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {UserDTO} from "../../models/userDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../services/member.service";
import {ChangePasswordDTO} from "../../../core/models/changePasswordDTO";
import {passwordMatchValidator} from "../../../shared/validators/passwordMatchValidator";
import {TournamentService} from "../../../tournaments/services/tournament.service";
import {TournamentDTO} from "../../../tournaments/models/tournamentDTO";
import {TournamentStatus} from "../../../tournaments/enums/tournamentStatus";
import {Observable, tap} from "rxjs";
import {TournamentIndexDTO} from "../../../tournaments/models/tournamentIndexDTO";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  connectedUser?: UserDTO;
  changePasswordForm: FormGroup;
  newPass!: ChangePasswordDTO;
  tournaments!: TournamentDTO[] | null;

  private tournamentsList$: Observable<TournamentIndexDTO>;

  constructor(
    private _authServ: AuthService,
    private _FB: FormBuilder,
    private _memberServ: MemberService,
    private _tournamentServ: TournamentService
  ) {
    // Initialisation du formulaire de changement de mot de passe
    this.changePasswordForm = this._FB.group(
      {
        oldPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required]],
        newConfirmedPassword: [null, [Validators.required]]
      },
      {
        validators: passwordMatchValidator() // Assure que les nouveaux mots de passe correspondent
      }
    );

    // Récupération de la liste des tournois avec certains statuts
    this.tournamentsList$ = this._tournamentServ.getTournamentsFromServer(
      {
        status: [
          TournamentStatus.WAITINGFORPLAYERS,
          TournamentStatus.INPROGRESS,
          TournamentStatus.CLOSED
        ]
      }
    ).pipe(
      tap(data => {
        this.tournaments = data.results;
        console.log(data.results);
      })
    );
  }

  ngOnInit(): void {
    // Récupération de l'utilisateur connecté
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }

    // Récupération de la liste des tournois avec certains statuts lors de l'initialisation
    this.tournamentsList$ = this._tournamentServ.getTournamentsFromServer(
      {
        status: [
          TournamentStatus.WAITINGFORPLAYERS,
          TournamentStatus.INPROGRESS,
          TournamentStatus.CLOSED
        ]
      }
    ).pipe(
      tap(data => {
        this.tournaments = data.results;
        console.log(data.results);
      })
    );
  }

  // Méthode pour définir le nouveau mot de passe
  setPassword() {
    if (this.changePasswordForm.valid) {
      const newPassChanged = this.changePasswordForm.get('newPassword')?.value;
      const oldPass = this.changePasswordForm.get('oldPassword')?.value;

      this.newPass = {
        oldPassword: oldPass,
        password: newPassChanged
      };
      console.log(this.newPass);
      this._memberServ.editPassword(this.newPass).subscribe();
    }
  }
}
