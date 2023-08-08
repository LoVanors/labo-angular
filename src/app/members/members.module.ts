import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMemberComponent } from './components/new-member/new-member.component';
import {MembersRoutingModule} from "./members-routing.module";
import {SharedModule} from "primeng/api";
import {MemberService} from "./services/member.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { LoginComponent } from '../login/login.component';
import { ProfilComponent } from './components/profil/profil.component';



@NgModule({
  declarations: [
    NewMemberComponent,
    LoginComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ProgressSpinnerModule,
    FormsModule
  ],
  providers: [
    MemberService
  ]
})
export class MembersModule { }
