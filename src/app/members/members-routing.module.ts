import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MemberListComponent} from "./components/member-list/member-list.component";
import {SingleMemberComponent} from "./components/single-member/single-member.component";
import {NewMemberComponent} from "./components/new-member/new-member.component";
import {EditMemberComponent} from "./components/edit-member/edit-member.component";

const routes: Routes = [
  { path : '', component : MemberListComponent },
  { path : 'create',component : NewMemberComponent },
  { path : 'edit', component : EditMemberComponent },
  { path : ':id', component : SingleMemberComponent },
  { path : '', pathMatch : 'full', redirectTo : 'members' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
