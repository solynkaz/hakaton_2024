import { STAND_ALONE } from './app.constants';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageModule } from './modules/main-page/main-page.module';
import { AppRoutingModule } from './app-module.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BaseModule } from './layout/base.module';

@NgModule({
  declarations: [AppComponent],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BaseModule,
    FormsModule,
    AppRoutingModule,
    MainPageModule,
  ],
})
export class AppModule {}
