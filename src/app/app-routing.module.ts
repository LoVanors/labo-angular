import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path : 'members', loadChildren: () => import('./members/members.module').then(m => m.MembersModule)},
  { path : 'tournaments', loadChildren: () => import('./tournaments/tournaments.module').then(m => m.TournamentsModule)},
  { path : 'login', component : LoginComponent },
  { path : 'home', component: HomeComponent},
  { path : '', redirectTo: 'tournaments', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
