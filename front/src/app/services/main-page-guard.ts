import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthProfileService } from './auth-profile.service';

@Injectable()
export class MainPageGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthProfileService) private auth: AuthProfileService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.checkForAuthorizedToken()) {
      return true;
    } else {
      this.router.navigate(['/vacancies']);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(next, state);
  }
}
