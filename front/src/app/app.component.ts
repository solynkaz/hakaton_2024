import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { AuthProfileService } from './services/auth-profile.service';

@Component({
  selector: 'hakaton-application',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [AuthProfileService],
})
export class AppComponent implements OnInit, OnDestroy {
  public isUserLoaded = false;

  private subscription: Subscription | null = null;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
