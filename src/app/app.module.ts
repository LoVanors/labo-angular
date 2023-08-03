import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import { HomeComponent } from './home/home.component';
import {SharedModule} from "primeng/api";
import {CoreModule} from "./core/core.module";
import {TournamentsModule} from "./tournaments/tournaments.module";
import {MembersModule} from "./members/members.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    TournamentsModule,
    MembersModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
