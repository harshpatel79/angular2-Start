import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import {AuthService} from './Services/auth.service';
import {CanActivateService} from './Services/canActivate.service';
import {HttpService} from './Services/http.service';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes), AboutModule, HomeModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    AuthService,
    CanActivateService,
    HttpService
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }
