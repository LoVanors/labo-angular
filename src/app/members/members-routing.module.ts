import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewMemberComponent} from "./components/new-member/new-member.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {roleGuard} from "../core/guards/role.guard";

const routes: Routes = [
  { path : 'create',component : NewMemberComponent, canActivate: [roleGuard] },
  { path : ':id',component : ProfilComponent},
  { path : '', pathMatch : 'full', redirectTo : 'members' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
