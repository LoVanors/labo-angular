import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {UserDTO} from "../../models/userDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../services/member.service";
import {ChangePasswordDTO} from "../../../core/models/changePasswordDTO";
import {passwordMatchValidator} from "../../../shared/validators/passwordMatchValidator";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  connectedUser?: UserDTO
  changePasswordForm: FormGroup;
  newPass!: ChangePasswordDTO;

  constructor(private _authServ: AuthService,
              private _FB: FormBuilder,
              private _memberServ: MemberService) {
    this.changePasswordForm = this._FB.group(
      {
        oldPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required]],
        newConfirmedPassword: [null, [Validators.required]]
      },
      {
        validators: passwordMatchValidator()
      }
    )
  }

  ngOnInit(): void {
    if (this._authServ.getToken()) {
      this.connectedUser = this._authServ.getToken()?.user;
    } else {
      this.connectedUser = undefined;
    }
  }

  setPassword() {
    if (this.changePasswordForm.valid) {
      const newPassChanged = this.changePasswordForm.get('newPassword')?.value;
      const oldPass = this.changePasswordForm.get('oldPassword')?.value;

      this.newPass = {
        oldPassword: oldPass,
        password: newPassChanged
      }
      console.log(this.newPass)
      this._memberServ.editPassword(this.newPass).subscribe();
    }
  }
}
