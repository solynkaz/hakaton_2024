import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageModule } from './modules/main-page/main-page.module';
import { AppRoutingModule } from './app-module.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BaseModule } from './layout/base.module';
import { AuthGuard } from './services/auth-service.guard';
import { MainPageGuard } from './services/main-page-guard';

@NgModule({
  declarations: [AppComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    AuthGuard,
    MainPageGuard,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BaseModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainPageModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
})
export class AppModule {}
