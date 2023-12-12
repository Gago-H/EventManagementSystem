import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EventsComponent } from './events/events.component';
import { AuthInterceptor } from './login/auth.interceptor';
import { Router, RouterModule } from '@angular/router';


@NgModule({
declarations: [
AppComponent,
HomeComponent,
CounterComponent,
FetchDataComponent,
NavMenuComponent,
LoginComponent,
EventsComponent,
],
imports: [
BrowserModule,
BrowserAnimationsModule,
AppRoutingModule,
HttpClientModule,
MatButtonModule,
MatFormFieldModule,
MatIconModule,
MatToolbarModule,
ReactiveFormsModule,
MatFormFieldModule,
MatInputModule,
RouterModule
],
providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
}],
bootstrap: [AppComponent]
})
export class AppModule { }