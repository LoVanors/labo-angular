import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTournamentComponent } from './components/new-tournament/new-tournament.component';
import { EditTournamentComponent } from './components/edit-tournament/edit-tournament.component';
import { SingleTournamentComponent } from './components/single-tournament/single-tournament.component';
import { TournamentsListComponent } from './components/tournaments-list/tournaments-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TournamentsRoutingModule} from "./tournaments-routing.module";
import {SharedModule} from "primeng/api";
import {TournamentService} from "./services/tournament.service";
import {MatchService} from "./services/match.service";
import {TournamentInscriptionService} from "./services/tournament-inscription.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "../core/interceptors/jwt.interceptor";



@NgModule({
  declarations: [
    NewTournamentComponent,
    EditTournamentComponent,
    SingleTournamentComponent,
    TournamentsListComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ProgressSpinnerModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    TournamentService,
    MatchService,
    TournamentInscriptionService
  ]
})
export class TournamentsModule { }
