import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {SharedModule} from "primeng/api";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
      HeaderComponent,
      NavBarComponent
  ],
  imports: [
      CommonModule,
      SharedModule,
      RouterModule,
      HttpClientModule,
  ],
  exports: [
      HeaderComponent,
      NavBarComponent
  ]
})
export class CoreModule { }
