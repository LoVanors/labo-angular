import {Component} from '@angular/core';
import {UserDTO} from "../../models/userDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {MemberFormDTO} from "../../models/memberFormDTO";
import {tap} from "rxjs";

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent {
  newMemberForm: FormGroup; // Formulaire pour ajouter un nouveau membre
  newMember!: MemberFormDTO; // Nouveau membre à ajouter

  constructor(
    private _FB: FormBuilder,
    private _router: Router,
    private _memberServ: MemberService
  ) {
    // Initialisation du formulaire pour ajouter un nouveau membre
    this.newMemberForm = this._FB.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      elo: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });
  }

  // Fonction pour ajouter un nouveau membre
  addNewMember() {
    if (this.newMemberForm.valid) {
      this.newMember = this.newMemberForm.value;
      // Appel au service pour créer un nouveau membre
      this._memberServ.createNewMember(this.newMember).pipe(
        // Navigation vers la page d'accueil après l'ajout
        tap(() => this._router.navigateByUrl(''))
      ).subscribe();
    }
  }

  // Fonction pour vérifier l'existence du nom d'utilisateur
  checkUsername() {
    const username = this.newMemberForm.get('username')?.value;

    if (username) {
      // Vérification de l'existence du nom d'utilisateur via le service
      this._memberServ.checkUsernameExists(username).subscribe(usernameExists => {
        if (usernameExists) {
          this.newMemberForm.get('username')?.setErrors({ usernameExists: true });
        } else {
          this.newMemberForm.get('username')?.setErrors(null);
        }
      });
    }
  }

  // Fonction pour vérifier l'existence de l'adresse e-mail
  checkEmail() {
    const email = this.newMemberForm.get('email')?.value;

    if (email) {
      // Vérification de l'existence de l'adresse e-mail via le service
      this._memberServ.checkEmailExists(email).subscribe(emailExists => {
        if (emailExists) {
          this.newMemberForm.get('email')?.setErrors({ emailExists: true });
        } else {
          this.newMemberForm.get('email')?.setErrors(null);
        }
      });
    }
  }
}
