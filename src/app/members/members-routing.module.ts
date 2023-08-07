import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewMemberComponent} from "./components/new-member/new-member.component";

const routes: Routes = [
  { path : 'create',component : NewMemberComponent },
  { path : '', pathMatch : 'full', redirectTo : 'members' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
