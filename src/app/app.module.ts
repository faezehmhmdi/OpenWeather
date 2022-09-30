import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CurrentWeatherComponent} from './current-weather/current-weather.component';
import {HttpClientModule} from '@angular/common/http';
import {CardModule} from "primeng/card";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {DropdownModule} from "primeng/dropdown";
import {DividerModule} from "primeng/divider";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
  ],
  imports: [
    FormsModule,
    ScrollingModule,
    DropdownModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    DividerModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
