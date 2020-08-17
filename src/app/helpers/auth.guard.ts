import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login/login.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService,
    public location: Location
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isCurrentUserAuthenticated()) {
      return true;
    }

    const returnUrl = this.location.path();

    if (returnUrl) {
      this.router.navigate(['/login'], {queryParams: {'return-url': this.location.path()}});
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
