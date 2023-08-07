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
  newMemberForm: FormGroup;
  newMember!: MemberFormDTO;

  constructor(private _FB: FormBuilder,
              private _router: Router,
              private _memberServ: MemberService) {
    this.newMemberForm = this._FB.group(
      {
        username: [null, [Validators.required]],
        email: [null,[Validators.required, Validators.email]],
        birthDate: [null,[Validators.required]],
        elo: [null,[Validators.required]],
        gender: [null,[Validators.required]]
      }
    )
  }

  addNewMember() {
    if (this.newMemberForm.valid) {
      this.newMember = this.newMemberForm.value;
      this._memberServ.createNewMember(this.newMember).pipe(
        tap(()=> this._router.navigateByUrl(''))
      ).subscribe();
    }
  }
}
