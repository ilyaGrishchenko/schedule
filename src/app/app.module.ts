import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { ScheduleComponent } from './components/schedule/schedule.component';

import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    ScheduleComponent,
    HttpClientModule,
    HotTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
