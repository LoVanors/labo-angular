import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TournamentsListComponent} from "./components/tournaments-list/tournaments-list.component";
import {SingleTournamentComponent} from "./components/single-tournament/single-tournament.component";
import {NewTournamentComponent} from "./components/new-tournament/new-tournament.component";
import {EditTournamentComponent} from "./components/edit-tournament/edit-tournament.component";
import {roleGuard} from "../core/guards/role.guard";

const routes: Routes = [
  { path : '', component : TournamentsListComponent },
  { path : 'create', component : NewTournamentComponent, canActivate: [roleGuard] },
  { path : 'edit/:id', component : EditTournamentComponent, canActivate: [roleGuard] },
  { path : ':id', component : SingleTournamentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule { }
