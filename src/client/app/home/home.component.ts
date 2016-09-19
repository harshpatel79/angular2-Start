import { Component} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent{

  errorMessage: string;
  user: Object  = {};
  data: Object = {};
  constructor(private authService: AuthService , private router: Router) {
    console.log("authservice",this.authService);
  }

  // login(): boolean {
  //   console.log("router",this.router);
  //   this.authService.login(this.user);
  //   console.log("this.authService.redirectUrl",this.authService.redirectUrl);
  //   this.router.navigate(['about']);
  //   // if(this.authService.redirectUrl){
  //   //     this.router.navigate([this.authService.redirectUrl]);
  //   // }else{
  //   //   this.router.navigate(['about']);
  //   // }
  //
  //   return false;
  // };

  login(){

     this.authService.login(this.user).subscribe((data) => { 
         this.data = data;
         console.log("data in re",this.data);
         console.log("this.authService.isLoggedIn()",this.authService.isLoggedIn());
         if(this.data.user && this.data.notice === "Login Successful!"){
           let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'about';
           console.log("this.authService.redirectUrl",this.authService.redirectUrl);
           this.router.navigate([redirect]);
           //return false;
         }
         // if (this.authService.isLoggedIn) {
         //
         // }
       },
       error =>  this.errorMessage = <any>error);
    


    //this.authService.login(this.user).subscribe(() => {
    //  if (this.authService._isLoggedIn) {
    //    // Get the redirect URL from our auth service
    //    // If no redirect has been set, use the default
    //    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'about';
        // Redirect the user
    //    console.log("this.authService.redirectUrl",this.authService.redirectUrl);
    //    this.router.navigate([redirect]);

    //  }

    //});
  }


}
