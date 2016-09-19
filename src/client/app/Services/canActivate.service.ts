import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  	// this.authService.isLoggedInObservable().subscribe((val) => {
    //   if (!val) {this.router.navigate(['']); }
    // });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("this.authService.isLoggedIn in authisLoggedIn()",this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
         return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['']);
    return false;
  }
}
