import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewMemberComponent} from "./components/new-member/new-member.component";
import {ProfilComponent} from "./components/profil/profil.component";

const routes: Routes = [
  { path : 'create',component : NewMemberComponent },
  { path : ':id',component : ProfilComponent},
  { path : '', pathMatch : 'full', redirectTo : 'members' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
