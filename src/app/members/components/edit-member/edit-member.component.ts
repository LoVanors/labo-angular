import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {UserDTO} from "../../models/userDTO";

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit{

  connectedUser!:UserDTO;

  constructor(private _authServ : AuthService) { }

  ngOnInit() {

  }
}
